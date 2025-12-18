import { Link } from 'react-router-dom';
import './SiteHeader.css'

export function SiteHeader() {
  return (
    <div className="site-header">
      <Link to="/" className="site-title">From the Other Side
      </Link>
    </div>
  )
}