import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/home/HomePage'
import { SightingsPage } from './components/sightings/SightingsPage';
import './App.css'
import { UploadSighting } from './components/sightings/UploadSighting';
import { NewsPage } from './components/news/NewsPage';

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="sightings" element={<SightingsPage />} />
      <Route path="upload-sighting" element={<UploadSighting />} />
      <Route path="news" element={<NewsPage />} />
    </Routes>
  )
}

export default App
