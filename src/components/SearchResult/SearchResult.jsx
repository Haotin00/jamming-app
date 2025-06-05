import ResultCard from '../ResultCard/ResultCard';
import PlusIcon from '../../assets/plus.svg?react'
import './SearchResult.css'

function SearchResult({res}) {
    return (
        <>
            <div className='search-result-container'>
                {res.map((r) => { return <ResultCard songName={r.songName} artist={r.artist} Icon={PlusIcon}> </ResultCard> })}
            </div>
        </>
    );
}

export default SearchResult;