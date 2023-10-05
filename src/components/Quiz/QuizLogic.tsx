"use client"

import { useQuery } from "@tanstack/react-query"
import { ArrowRight, Check, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { GetQuizQuestionsByIdQuery, QuizAnswer, QuizQuestion } from "@/gql/graphql"
import { useLocale } from "@/i18n/useLocale"
import { getQuizQuestionsById } from "@/lib/client"
import { cn } from "@/utils/cn"
import { RichText } from "../RichText/RichText"

type ExtendedQuizAnswer = QuizAnswer & { status?: "clicked" | null }

type ExtendedQuizQuestion = QuizQuestion & { answer: ExtendedQuizAnswer[]; isAnswered?: boolean }

type Quiz = GetQuizQuestionsByIdQuery["quiz"] & {
  isAnswered: boolean
  question: ExtendedQuizQuestion[]
  answer: ExtendedQuizAnswer[]
  id: string
}

export type QuizProps = {
  initialQuiz: Quiz
}

export function QuizLogic({ initialQuiz }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<ExtendedQuizQuestion[]>(initialQuiz?.question)

  const locale = useLocale()
  const { data } = useQuery(
    ["quiz-questions", initialQuiz?.id],
    () => getQuizQuestionsById({ locale, id: initialQuiz.id || "", skip: 0 }),
    {
      placeholderData: initialQuiz?.question,
      enabled: !!initialQuiz,
    }
  )

  const currentQuestion = questions[currentQuestionIndex]

  const pickAnswer = (id: string) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question.id !== currentQuestion.id) return question

        const updatedAnswers = question.answer.map((answer): ExtendedQuizAnswer => {
          if (answer.id === id) {
            return { ...answer, status: "clicked" }
          }
          return answer
        })

        return { ...question, answer: updatedAnswers }
      })
    })
  }

  const endQuestion = () => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question.id !== currentQuestion.id) return question

        return { ...question, isAnswered: true }
      })
    })
  }

  const handleClickQuestion = (id: string) => {
    const remainingValidAnswers = currentQuestion.answer.filter((answer) => answer.isValid && !answer.status)
    const clickedAnswer = currentQuestion.answer.find((answer) => answer.id === id)
    if (currentQuestion.isAnswered || !clickedAnswer) return
    pickAnswer(id)
    if (remainingValidAnswers.length === 1 && clickedAnswer.isValid) {
      endQuestion()
    }
  }

  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex + 1 === data?.length

  const nextQuestion = () => {
    if (isLastQuestion) return
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  const previousQuestion = () => {
    if (isFirstQuestion) return
    setCurrentQuestionIndex((prev) => prev - 1)
  }

  useEffect(() => {
    if (!data) return
    setQuestions(data as QuizQuestion[])
  }, [data])

  return (
    <>
      {data && (
        <div className="w-full items-center justify-center">
          <div className="mx-1 flex items-center justify-between pb-8">
            <RichText raw={currentQuestion.content.raw} />
            <p className="font-semibold text-custom-gray-300">
              {currentQuestionIndex + 1}/{data?.length}
            </p>
          </div>
          <ul className="flex flex-col gap-y-3">
            {currentQuestion.answer.map((answer: ExtendedQuizAnswer, index) => (
              <li
                onClick={() => handleClickQuestion(answer.id)}
                key={index}
                className={cn(
                  answer.status && answer.isValid && "bg-black",
                  answer.status && !answer.isValid && "bg-custom-gray-200",
                  !answer.status && !currentQuestion.isAnswered && "cursor-pointer hover:bg-slate-50",
                  "flex items-center justify-between rounded-xl border-[1px] px-4 py-2"
                )}
              >
                <RichText raw={answer.content.raw} pClassName={cn(answer.status && answer.isValid && "text-white")} />
                {answer.status && answer.isValid && <Check stroke="white" />}
                {answer.status && !answer.isValid && <XCircle stroke="#D9D9D9" />}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-8 flex w-full justify-between">
        <button disabled={isFirstQuestion} className="p-4 disabled:text-custom-gray-300" onClick={previousQuestion}>
          Back
        </button>
        <button
          disabled={isLastQuestion}
          className="flex items-center gap-2 rounded-xl bg-black px-4 py-1 text-white disabled:text-custom-gray-300"
          onClick={nextQuestion}
        >
          Next
          <ArrowRight />
        </button>
      </div>
    </>
  )
}

export default QuizLogic
