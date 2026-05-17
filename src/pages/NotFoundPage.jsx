import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition.jsx'

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="card-surface rounded-xl p-10 text-center">
        <p className="eyebrow-cap">404</p>
        <h1 className="mt-4 heading-xl md:text-4xl">Page not found</h1>
        <p className="mt-3 body-md text-shade-50">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary-pill mt-5 inline-block">
          Return Home
        </Link>
      </div>
    </PageTransition>
  )
}
