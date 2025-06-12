import Header from '../Header/Header.jsx'
import './AuthPage.css'
import {redirectToSpotifyAuth} from '../../api/spotifyAuth.js'

function AuthPage() {
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
