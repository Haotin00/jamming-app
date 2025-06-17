import axios from 'axios';

/**
 * Save a playlist to the user's Spotify account.
 * @param {string} accessToken - The Spotify access token.
 * @param {string} playlistName - The name of the playlist to create.
 * @param {Array<string>} trackUris - An array of Spotify track URIs to add to the playlist.
 * @returns {Promise<void>} - Resolves when the playlist is successfully created and tracks are added.
 */
export async function savePlaylist(accessToken, playlistName, trackUris) {
    let userId;

    if (!accessToken || !playlistName || !trackUris.length) {
        throw new Error('Missing required parameters.');
    }
    
    // Fetch the user's Spotify ID
    try {
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(userResponse);
        userId = userResponse.data.id;
    } catch (error) {
        console.error('Error fetching user ID:', error.response?.data || error.message);
        throw error;
    }

    try {
        // Create a new playlist
        const createPlaylistResponse = await axios.post(
            `https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                name: playlistName,
                description: 'Created with Jamming App',
                public: false,
                collaborative: false,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const playlistId = createPlaylistResponse.data.id;

        // Add tracks to the playlist
        await axios.post(
            `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            {
                uris: trackUris,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Playlist saved successfully!');
    } catch (error) {
        console.error('Error saving playlist:', error.response?.data || error.message);
        throw error;
    }
}