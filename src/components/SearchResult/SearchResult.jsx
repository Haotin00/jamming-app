import ResultCard from '../ResultCard/ResultCard';
import PlusIcon from '../../assets/plus.svg?react'
import './SearchResult.css'

function SearchResult({ tracks, onMoveTrack }) {
    return (
        <div className='search-result-container'>
            <h1 id='title'> Results </h1>
            {tracks.map((track) => {
                return <ResultCard key={track.id} id={track.id}
                    name={track.name} artist={track.artist}
                    onClick={onMoveTrack}>
                    <PlusIcon />
                </ResultCard>
            })}
        </div>
    );
}

export default SearchResult;