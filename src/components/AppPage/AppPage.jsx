import { useState, useEffect } from 'react'
import './AppPage.css'
import Header from '../Header/Header.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import SearchResult from '../SearchResult/SearchResult.jsx'
import Playlist from '../Playlist/Playlist.jsx'
import { useSpotifyTokenManager } from '../../hooks/useSpotifyTokenManager.js'

const songs = [
  { songName: "Take on me", artist: "Aha" },
  { songName: "Maniac", artist: "Carpenter Brut" },
];

function AppPage() {
  const [musicInput, setMusicInput] = useState("")

  const [spotifyToken, isSpotifyTokenValid] = useSpotifyTokenManager();

  function onMusicInputChange(newInput) {
    setMusicInput(newInput);
  }

  return (
    <>
    <div>
      <Header></Header>
      <SearchBar placeholder="Music Name..." changeCallback={onMusicInputChange}></SearchBar>
      <div className='container'>
        <div className='search-result'>
          <SearchResult res={songs}></SearchResult>
        </div>
        <div className='playlist'>
          <Playlist songs={songs}></Playlist>
        </div>
      </div>
    </div>
    </>
  )
}

export default AppPage
