import { useState } from 'react'
import Modal from '../components/Modal.jsx'
import OrderTracker from '../components/OrderTracker.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { orders } from '../data/orders.js'

export default function DashboardPage() {
  const [activeOrder, setActiveOrder] = useState(null)

  return (
    <PageTransition>
      <h1 className="heading-xl md:text-4xl">My Dashboard</h1>
      <p className="mt-2 body-md text-shade-50">Track your recent Zeenkaar orders in real time.</p>

      <section className="mt-8 space-y-4">
        {orders.map((order) => (
          <OrderTracker key={order.id} order={order} onTrack={setActiveOrder} />
        ))}
      </section>

      <Modal
        isOpen={Boolean(activeOrder)}
        title={activeOrder ? `Tracking ${activeOrder.id}` : 'Tracking'}
        onClose={() => setActiveOrder(null)}
      >
        {activeOrder && (
          <div className="space-y-3 body-md text-shade-50">
            <p>
              <span className="body-strong">Carrier:</span> {activeOrder.carrier}
            </p>
            <p>
              <span className="body-strong">Tracking Number:</span> {activeOrder.trackingNumber}
            </p>
            <p>
              <span className="body-strong">Destination:</span> {activeOrder.destination}
            </p>
            <p>
              <span className="body-strong">Items:</span> {activeOrder.items.join(', ')}
            </p>

            <div className="mt-4 space-y-2">
              {activeOrder.checkpoints.map((checkpoint) => (
                <div key={checkpoint.title} className="flex items-center justify-between rounded-lg border border-hairline-light bg-canvas-light px-3 py-2">
                  <p>{checkpoint.title}</p>
                  <p className="text-xs text-shade-50">{checkpoint.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </PageTransition>
  )
}
