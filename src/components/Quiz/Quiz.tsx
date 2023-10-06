import { QuizDynamic } from "./QuizDynamic"
import { QuizProps } from "./QuizLogic"

export async function Quiz({ initialQuiz }: QuizProps) {
  return (
    <div className="w-full flex-col items-center justify-center rounded-xl border-[1px] p-5">
      <QuizDynamic initialQuiz={initialQuiz} />
    </div>
  )
}
