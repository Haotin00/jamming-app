import { useState } from 'react'
import './App.css'
import './components/Header/Header.jsx'
import Header from './components/Header/Header.jsx'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import SearchResult from './components/SearchResult/SearchResult.jsx'
import Playlist from './components/Playlist/Playlist.jsx'

const songs = [
  { songName: "Take on me", artist: "Aha" },
  { songName: "Maniac", artist: "Carpenter Brut" },
];

function App() {
  const [musicInput, setMusicInput] = useState("")

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

export default App
