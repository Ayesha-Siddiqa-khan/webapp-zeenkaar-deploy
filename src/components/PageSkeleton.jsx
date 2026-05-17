import SkeletonCard from './SkeletonCard.jsx'

export default function PageSkeleton() {
  return (
    <div className="container-shell py-14">
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-shade-30" />
      <div className="mb-8 h-6 w-96 animate-pulse rounded bg-shade-30" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  )
}
