import { TopHeader } from "../header/TopHeader"
import { SiteHeader } from "../header/SiteHeader"
import { Footer } from "../footer/Footer"

export function SightingsPage() {
  return (
    <>
      <TopHeader />
      <SiteHeader />
      <main className="sightings">
        <h1 className="page-title">Sightings</h1>
        <div className="cards-container">
        </div>
      </main>
      <Footer />
    </>
  )
}