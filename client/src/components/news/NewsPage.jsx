import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"
import './NewsPage.css'


export function NewsPage() {
  return (
    <div className="page">
      <TopHeader />
      <SiteHeader variant="page" />
      <main className="sightings">
        <h1 className="page-title">Live News</h1>
        <div className="live-container" id="live-container">
        </div>
      </main>
      <Footer />
    </div>
  )
}