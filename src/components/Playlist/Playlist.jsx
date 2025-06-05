import './Playlist.css'
import ResultCard from '../ResultCard/ResultCard';
import MinusIcon from '../../assets/minus-icon.svg?react'

function Playlist({songs}) {
    return (<>
        <div className="playlist-card">
            <input type="text" placeholder='Playlist name...'></input>
            <div className='song-container'>
            {songs.map((s) => { return <ResultCard songName={s.songName} artist={s.artist} Icon={MinusIcon}> </ResultCard> })}
            </div>
            <button> Save to spotify </button>
        </div>
    </>);
}

export default Playlist;