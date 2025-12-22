import { Link } from 'react-router-dom';
import candleLogo from '../../assets/images/candle-logo.png'
import './TopHeader.css'

export function TopHeader() {
  return (
    <div className="top-header">
      <img className="logo-img" src={candleLogo}/>
      <nav id="main-navigation">
        <ul role="list">
          <li role="listitem"><Link to="/">Home</Link></li>
          <li role="listitem"><Link to="/sightings">Read</Link></li>
          <li role="listitem"><Link to="/upload-sighting">Upload</Link></li>
        </ul>
      </nav>
    </div>
  )
}