import Header from '../Header/Header.jsx'
import './AuthPage.css'
import { redirectToSpotifyAuth } from '../../api/spotifyAuth.js'
import { useSpotifyTokenManager } from '../../hooks/useSpotifyTokenManager.js'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [spotifyToken, isSpotifyTokenValid] = useSpotifyTokenManager();
  const navigate = useNavigate();

  useEffect(() => {
    // If the token is set, navigate to the app page
    if (isSpotifyTokenValid()) {
      navigate('/app');
    }
  }, [spotifyToken]);

  return (
    <>
      <div>
        <Header></Header>
        <button id='loginToSpotifyButton' className='center' onClick={redirectToSpotifyAuth}>Login to spotify</button>
      </div>
    </>
  )
}

export default AuthPage
