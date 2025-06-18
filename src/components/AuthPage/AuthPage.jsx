import Header from '../Header/Header'
import './AuthPage.css'
import { redirectToSpotifyAuth } from '../../api/spotify/spotifyAuth'
import { usePageManager } from '../../hooks/usePageManager.js'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  usePageManager();

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
