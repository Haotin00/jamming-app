import React, { use } from 'react';
import { useSpotifyTokenManager } from '../../hooks/useSpotifyTokenManager';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SpotifyAuthenticate() {
    
    const [spotifyToken, isSpotifyTokenValid] = useSpotifyTokenManager();
    const navigate = useNavigate();

    useEffect(() => {
        // If the token is set, navigate to the app page
        if (isSpotifyTokenValid()) {
            navigate('/app');
        }
    }, [spotifyToken]);

    return (
        <div>
            <h1>Spotify Authentication</h1>
            {<p>Authenticating...</p>}
        </div>
    );
}

export default SpotifyAuthenticate;