import { useEffect, useState } from "react";
import './SearchBar.css'

function SearchBar({ placeholder, changeCallback }) {
    const [userInput, setUserInput] = useState("");

    function onChange(event) {
        const target = event.target;
        setUserInput(target.value);
    }

    useEffect(() => {
        changeCallback(userInput);
    }, [userInput])

    return (
        <div className='searchbar'>
                <input type="text" placeholder={placeholder} value={userInput}
                    onChange={onChange}></input>
        </div>
    );
}

export default SearchBar;