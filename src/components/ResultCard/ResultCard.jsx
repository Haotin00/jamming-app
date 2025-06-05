import './ResultCard.css'

function ResultCard({ songName, artist, Icon }) {
    return (
        <div className="result-card">
            <h1>{songName} - {artist}</h1>
            {Icon && <button className='icon-button'>
                <Icon />
            </button>}
        </div>
    );
}

export default ResultCard;