import { useState, useEffect } from 'react'
import './AppPage.css'
import Header from '../Header/Header.jsx'
import SearchBar from '../SearchBar/SearchBar.jsx'
import SearchResult from '../SearchResult/SearchResult.jsx'
import Playlist from '../Playlist/Playlist.jsx'
import { usePageManager } from '../../hooks/usePageManager.js'
import { spotifyResearch } from '../../api/spotify/search.js'
import { useSpotifyTokenManager } from '../../hooks/useSpotifyTokenManager.js'

function AppPage() {
  
  usePageManager();

  const [spotifyToken, isTokenValid] = useSpotifyTokenManager();
  const [trackResults, setTrackResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  const searchTrack = async (track) => {
    const result = await spotifyResearch(track, spotifyToken);
    
    if (result.tracks)
    {
      const tracks = result.tracks.items.map((track) => {return {id: track.id, name: track.name, artist: track.artists[0].name}})
      setTrackResults(tracks);
    }
  }

  const tryToAddToPlaylist = (id) => {
    // If track is already in the playlist, don't add it again
    if (playlist.some((t) => t.id === id)) return;

    const track = trackResults.find((t) => t.id === id);
    if (!track)
    {
      console.error("Track not found in list, should not happen !");
      return;
    }
    
    setPlaylist((prev) => [...prev, track]);
  };

  const removeFromPlaylist = (id) => {
    setPlaylist((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <Header></Header>
      <SearchBar placeholder="Music Name..." searchCallback={searchTrack}>
      </SearchBar>
      <div className='container'>
        <div className='search-result'>
          <SearchResult tracks={trackResults} onMoveTrack={tryToAddToPlaylist}></SearchResult>
        </div>
        <div className='playlist'>
          <Playlist tracks={playlist} onMoveTrack={removeFromPlaylist}></Playlist>
        </div>
      </div>
    </div>
  )
}

export default AppPage;
