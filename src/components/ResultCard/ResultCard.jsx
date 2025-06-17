import './ResultCard.css'

function ResultCard({ id, name, artist, onClick, children }) {

    const handleClick = (event) => {
        onClick(id);
    }

    return (
        <div className="result-card">
            <h1>{name} - {artist}</h1>
            {children && 
            <button className='icon-button' onClick={handleClick}>
                {children}
            </button>}
        </div>
    );
}

export default ResultCard;