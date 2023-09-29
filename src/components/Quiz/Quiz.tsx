import { QuizDynamic } from "./QuizDynamic"
import { QuizProps } from "./QuizLogic"

export async function Quiz({ initialQuiz }: QuizProps) {
  return (
    <div className="w-[100%] flex-col justify-center p-5">
      <h2 className="py-5 text-2xl font-bold">{initialQuiz?.title}</h2>
      <div className="h-1 w-[100%] bg-slate-100" />
      <QuizDynamic initialQuiz={initialQuiz} />
    </div>
  )
}
