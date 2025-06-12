import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { retrieveRefreshedToken, handleSpotifyRedirect } from '../api/spotifyAuth';
import { redirectRoute as spotifyTokenRedirectRoute } from '../api/spotifyAuth';

export const useSpotifyTokenManager = () => {

    const [spotifyToken, setSpotifyToken] = useState(() => {
        return localStorage.getItem('spotify_access_token') || undefined;
    });

    const location = useLocation();

    // This effect runs once when the component mounts to check for an existing token
    useEffect(() => {
        const refreshTokenIfNeeded = async () => {
            // First check expiration date > localStorage expiration date
            const isoExpirationDate = localStorage.getItem('spotify_token_expiration_date');
            const expirationDate = new Date(isoExpirationDate);
            const currentTime = Date.now();
            
            const refreshMargin = 60000 * 2; // 2 minutes

            if (expirationDate - refreshMargin < currentTime) {
                const newToken = await retrieveRefreshedToken();
                setSpotifyToken(newToken);
            }
        }

        const fetchToken = async () => {
            // Handle the Spotify redirect and get the token
            const token = await handleSpotifyRedirect();

            if (token) {
                setSpotifyToken(token);
                localStorage.setItem('spotify_access_token', token);
            } else {
                console.error('Failed to retrieve Spotify token from redirect');
            }
        };

        if (location.pathname === spotifyTokenRedirectRoute) {
            fetchToken();
        }

        const interval = setInterval(refreshTokenIfNeeded, 10000);

        return () => {
            clearInterval(interval);
        }
    }, [location.pathname]);

    return spotifyToken;
}