import './Playlist.css'
import ResultCard from '../ResultCard/ResultCard';
import MinusIcon from '../../assets/minus-icon.svg?react'

function Playlist({ tracks, onMoveTrack }) {
    return (
        <div className="playlist-card">
            <input type="text" placeholder='Playlist name...'></input>
            <div className='song-container'>
                {tracks.map((s) => { return <ResultCard key={s.id} id={s.id} name={s.name} artist={s.artist} onClick={onMoveTrack} Icon={MinusIcon}> </ResultCard> })}
            </div>
            <button> Save to spotify </button>
        </div>
    );
}

export default Playlist;