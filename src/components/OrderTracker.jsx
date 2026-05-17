import { motion } from 'framer-motion'

const statusClass = {
  Delivered: 'bg-aloe-10 text-ink',
  'In Transit': 'bg-pistachio-10 text-ink',
  Processing: 'bg-shade-30 text-ink',
}

export default function OrderTracker({ order, onTrack }) {
  const progress = ((order.currentStep + 1) / order.checkpoints.length) * 100

  return (
    <article className="card-surface rounded-xl p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="heading-md">Order {order.id}</p>
        <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.08em] ${statusClass[order.status] ?? statusClass.Processing}`}>
          {order.status}
        </span>
      </div>

      <div className="grid gap-4 body-md text-shade-50 md:grid-cols-2 xl:grid-cols-4">
        <p>Date: {order.date}</p>
        <p>Total: ${order.total}</p>
        <p>Carrier: {order.carrier}</p>
        <p>Tracking: {order.trackingNumber}</p>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-shade-50">
          <span>Shipment progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-shade-30">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="h-full rounded-full bg-ink"
          />
        </div>
      </div>

      <div className="mt-5 grid gap-2 md:grid-cols-5">
        {order.checkpoints.map((checkpoint, index) => (
          <div key={checkpoint.title} className="rounded-lg border border-hairline-light bg-canvas-light p-3">
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                  checkpoint.done
                    ? 'bg-ink text-on-primary'
                    : 'bg-shade-30 text-shade-50'
                }`}
              >
                {checkpoint.done ? '✓' : index + 1}
              </span>
              <p className="text-xs uppercase tracking-[0.08em] text-shade-50">{checkpoint.title}</p>
            </div>
            <p className="text-xs text-shade-50">{checkpoint.time}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="body-md text-shade-50">{order.eta} • Destination: {order.destination}</p>
        <button type="button" onClick={() => onTrack(order)} className="btn-outline-light">
          Track package
        </button>
      </div>
    </article>
  )
}
