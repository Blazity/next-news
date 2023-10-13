"use client"

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto my-10 w-full text-center text-lg">
      <h2 className="py-5">Something went wrong!</h2>
      <button className="rounded-lg border-2 px-5 py-2 hover:bg-slate-50" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
