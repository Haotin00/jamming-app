import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import AppPage from './components/AppPage/AppPage';
import AuthPage from './components/AuthPage/AuthPage';
import SpotifyAuthenticate from './components/SpotifyAuthenticate/SpotifyAuthenticate';
import { redirectRoute as spotifyTokenRedirectRoute} from './api/spotifyAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/app" element={<AppPage />} />
        <Route path={spotifyTokenRedirectRoute} element={<SpotifyAuthenticate />} />
      </Routes>
    </Router>
  )
}

export default App;
