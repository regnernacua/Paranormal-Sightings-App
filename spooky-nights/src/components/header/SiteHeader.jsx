import { Link } from 'react-router-dom';
import './SiteHeader.css'

export function SiteHeader({ variant }) {
  return (
    <div className="site-header">
      <Link to="/" className={`site-header ${variant ?? ''}`}>From the Other Side
      </Link>
    </div>
  )
}