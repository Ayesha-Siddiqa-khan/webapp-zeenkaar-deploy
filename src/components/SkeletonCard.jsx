export default function SkeletonCard() {
  return (
    <div className="card-surface overflow-hidden rounded-xl p-5">
      <div className="mb-4 aspect-[3/4] animate-pulse rounded-lg bg-shade-30" />
      <div className="mb-3 h-4 w-24 animate-pulse rounded bg-shade-30" />
      <div className="mb-2 h-6 w-2/3 animate-pulse rounded bg-shade-30" />
      <div className="h-5 w-1/3 animate-pulse rounded bg-shade-30" />
    </div>
  )
}
