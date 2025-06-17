import { useEffect } from 'react';
import { useSpotifyTokenManager } from './useSpotifyTokenManager';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import sleep from '../utils/utils';

export const usePageManager = () => {

    const [spotifyToken, isSpotifyTokenValid] = useSpotifyTokenManager();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const changeRoute = async () => {
            if (location.pathname === ROUTES.SPOTIFY_AUTH)
            {
                await sleep(1000); // Wait to let time to retrieve info from API on auth page
            }

            if (isSpotifyTokenValid()) {
                navigate(ROUTES.APP);
            } else {
                navigate(ROUTES.HOME);
            }
        }

        changeRoute();
       
    }, [spotifyToken]);

    return;
}