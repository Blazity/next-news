import { Skeleton } from "@/components/ui/Skeleton/Skeleton"

export default function Loading() {
  return (
    <div className="w-full">
      <Skeleton className="min-h-[150px] w-full" />
    </div>
  )
}
