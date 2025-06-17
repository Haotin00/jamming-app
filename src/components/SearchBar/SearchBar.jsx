import { useEffect, useState } from "react";
import './SearchBar.css'
import SearchIcon from '../../assets/search-btn.svg?react'

function SearchBar({ placeholder, searchCallback }) {
    const [userInput, setUserInput] = useState("");

    function handleChange(event) {
        const target = event.target;
        setUserInput(target.value);
    }

    const handleClick = () => {
        if (userInput)
        {
            searchCallback(userInput);
        }
    }

    const handleKeyUp = ({key}) => {
        if (key === "Enter")
        {
            if (userInput)
            {
                searchCallback(userInput);
            }
        }
    }

    return (
        <div className='searchbar'>
                <input type="text" placeholder={placeholder} value={userInput}
                    onChange={handleChange} onKeyUp={handleKeyUp}/>
                <button className="searchbar-btn" onClick={handleClick}>
                    <SearchIcon></SearchIcon>
                </button>
        </div>
    );
}

export default SearchBar;