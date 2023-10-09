import { QuizDynamic } from "./QuizDynamic"
import { QuizProps } from "./QuizLogic"

export async function Quiz({ initialQuiz }: QuizProps) {
  return <QuizDynamic initialQuiz={initialQuiz} />
}
