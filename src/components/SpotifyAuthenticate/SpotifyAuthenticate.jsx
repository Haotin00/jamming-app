import React from 'react';
import { usePageManager } from '../../hooks/usePageManager.js'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SpotifyAuthenticate() {
    usePageManager();
    
    return (
        <div>
            <h1>Spotify Authentication</h1>
            {<p>Authenticating...</p>}
        </div>
    );
}

export default SpotifyAuthenticate;