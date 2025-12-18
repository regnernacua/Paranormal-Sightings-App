import { Link } from 'react-router-dom';
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
        <p>&copy; From The Other Side. All rights reserved.</p>
        <p>
          <Link to="/news">Check out our news feed!
          </Link> (beta)
        </p>
    </footer>
  )
}