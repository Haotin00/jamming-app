import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { retrieveRefreshedToken, handleSpotifyRedirect } from '../api/spotifyAuth';
import { redirectRoute as spotifyTokenRedirectRoute } from '../api/spotifyAuth';

const localStorageKeys = {
    ACCESS_TOKEN: 'spotify_access_token',
    REFRESH_TOKEN: 'spotify_refresh_token',
    EXPIRATION_DATE: 'spotify_token_expiration_date'
}

export const useSpotifyTokenManager = () => {

    const [spotifyToken, setSpotifyToken] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState(() => {
        return new Date(localStorage.getItem(localStorageKeys.EXPIRATION_DATE)) || null;
    })
    const [spotifyRefreshToken, setSpotifyRefreshToken] = useState();
    const location = useLocation();

    const updateTokenData = (newTokenData) => {
        setSpotifyToken(newTokenData.access_token);
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, newTokenData.access_token);

        setSpotifyRefreshToken(newTokenData.refresh_token);
        localStorage.setItem(localStorageKeys.REFRESH_TOKEN, newTokenData.refresh_token);

        const newExpirationDate = new Date(Date.now() + newTokenData.expires_in * 1000);
        setTokenExpirationDate(newExpirationDate);
        localStorage.setItem(localStorageKeys.EXPIRATION_DATE, newExpirationDate.toISOString());
    }

    const isSpotifyTokenValid = () => {
        return tokenExpirationDate > Date.now();
    }

    // This is run once at startup, to retrieve & set access token based on local storage if token is not expired.
    useEffect(() => {

        const retrieveTokenDataFromLocalStorage = () => {
            if (!tokenExpirationDate) {
                return;
            }

            if (tokenExpirationDate <= Date.now()) {
                // token expired
                return;
            }
            if (tokenExpirationDate > Date.now()) {
                console.log("Token still valid, try to get token data..")
                const localAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
                const localRefreshToken = localStorage.getItem(localStorageKeys.REFRESH_TOKEN);
                if (!localAccessToken)
                    console.error("Spotify access token not found in local storage");
                if (!localRefreshToken)
                    console.error("Spotify refresh token not found in local storage");

                setSpotifyToken(localAccessToken);
                setSpotifyRefreshToken(localRefreshToken);
            }
        }

        retrieveTokenDataFromLocalStorage();
    }, []);

    // This effect runs once when the component mounts to check for an existing token
    useEffect(() => {
        const fetchToken = async () => {
            // Handle the Spotify redirect and get the token
            const tokenData = await handleSpotifyRedirect();

            if (tokenData) {
                updateTokenData(tokenData);
            } else {
                console.error('Failed to retrieve Spotify token from redirect');
            }
        };

        if (location.pathname === spotifyTokenRedirectRoute) {
            fetchToken();
        }

    }, [location.pathname]);

    useEffect(() => {
        const refreshTokenIfNeeded = async () => {

            if (!spotifyToken) {
                return;
            }

            const currentTime = Date.now();

            const refreshMargin = 60000 * 2; // 2 minutes

            if (tokenExpirationDate - refreshMargin < currentTime) {
                const newTokenData = await retrieveRefreshedToken();
                if (newTokenData) {
                    updateTokenData(newTokenData);
                }
            }
        }

        const interval = setInterval(refreshTokenIfNeeded, 10000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    return [spotifyToken, isSpotifyTokenValid];
}