import './Playlist.css'
import ResultCard from '../ResultCard/ResultCard';
import MinusIcon from '../../assets/minus-icon.svg?react'
import { useState } from 'react';

function Playlist({ tracks, onMoveTrack, onSavePlaylist }) {
    
    const [playlistName, setPlaylistName] = useState("");
    
    const handleChange = ({target}) => {
        setPlaylistName(target.value);
    }

    const handleSavePlaylist = () => {
        const success = onSavePlaylist(playlistName, tracks);

        if (success) 
        {
            setPlaylistName("");
        }
    }
    
    return (
        <div className="playlist-card">
            <input type="text" placeholder='Playlist name...' value={playlistName} onChange={handleChange}/>
            <div className='song-container'>
                {tracks.map((s) => {
                    return <ResultCard key={s.id} id={s.id}
                        name={s.name} artist={s.artist}
                        onClick={onMoveTrack}>
                        <MinusIcon />
                    </ResultCard>
                })}
            </div>
            {(playlistName && tracks.length > 0) && <button onClick={handleSavePlaylist}> Save to spotify </button>}
        </div>
    );
}

export default Playlist;