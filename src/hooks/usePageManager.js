import { useEffect } from 'react';
import { useSpotifyTokenManager } from './useSpotifyTokenManager';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export const usePageManager = () => {

    const [spotifyToken, isSpotifyTokenValid] = useSpotifyTokenManager();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSpotifyTokenValid()) {
            navigate(ROUTES.APP);
        } else {
            navigate(ROUTES.HOME);
        }
    }, [spotifyToken]);

    return;
}