"use client"

import { useQuery } from "@tanstack/react-query"
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
        <div className="w-full items-center justify-center py-10">
          <RichText raw={currentQuestion.content.raw} />
          <ul className="flex flex-col gap-y-1">
            {currentQuestion.answer.map((answer: ExtendedQuizAnswer, index) => (
              <li
                onClick={() => handleClickQuestion(answer.id)}
                key={index}
                className={cn(
                  answer.status && answer.isValid && " bg-green-500",
                  answer.status && !answer.isValid && " bg-red-500 ",
                  !answer.status && !currentQuestion.isAnswered && "cursor-pointer hover:bg-slate-50",
                  " p-2, rounded px-5 shadow "
                )}
              >
                <RichText raw={answer.content.raw} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex w-full justify-start gap-3 p-1">
        {!isFirstQuestion && <button onClick={previousQuestion}>Previous</button>}
        {!isLastQuestion && <button onClick={nextQuestion}>Next</button>}
      </div>
    </>
  )
}

export default QuizLogic
