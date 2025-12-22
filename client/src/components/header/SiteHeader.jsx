import { Link } from 'react-router-dom';
import './SiteHeader.css'

export function SiteHeader({ variant = 'default' }) {
  return (
    <div className={`site-header ${variant === 'page' ? 'site-header-page' : ''}`}>
      < Link to="/" className={variant === 'page' ? 'site-title-page' : 'site-title'}
      >
        From the Other Side
      </Link>
    </div >
  )
}