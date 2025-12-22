import { Link } from 'react-router-dom';
import './Footer.css'

export function Footer( {showNews = true} ) {
  return (
    <footer className="footer">
        <p>&copy; From The Other Side. All rights reserved.</p>
        
        { showNews && (
          <p>
          <Link to="/news">Check out our news feed!
          </Link> (beta)
        </p>
        )}
    </footer>
  )
}