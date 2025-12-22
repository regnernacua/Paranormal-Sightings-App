import { SiteHeader } from "../header/SiteHeader"
import { TopHeader } from "../header/TopHeader"
import { Footer } from "../footer/Footer"
import './HomePage.css';

export function HomePage() {
  return (
    <div className="page">
      <title>Spooky Nights</title>
      <TopHeader />
      <SiteHeader />
      <main>
        <h1 className="hero-title">The online home of paranormal sightings</h1>
      </main>
      <Footer />
    </div>
  )
}