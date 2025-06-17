import './ResultCard.css'

function ResultCard({ id, name, artist, Icon, onClick }) {

    const handleClick = (event) => {
        onClick(id);
    }

    return (
        <div className="result-card">
            <h1>{name} - {artist}</h1>
            {Icon && <button className='icon-button' onClick={handleClick}>
                <Icon />
            </button>}
        </div>
    );
}

export default ResultCard;