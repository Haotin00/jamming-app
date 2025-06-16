const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
export const redirectRoute = import.meta.env.VITE_SPOTIFY_REDIRECT_ROUTE;
const baseUrl = import.meta.env.VITE_BASE_URL;
const redirectUri = baseUrl + redirectRoute;

const scope = 'user-read-private user-read-email'; // Adjust scopes as needed

// Generate a random string for the code verifier
function generateCodeVerifier(length = 128) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values).map(x => possible.charAt(x % possible.length)).join('');
}

// Generate a code challenge from the code verifier
async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Redirect user to Spotify authorization page
export async function redirectToSpotifyAuth() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Handle redirect back from Spotify and exchange code for access token
export async function handleSpotifyRedirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const error = params.get('error');

  if (error) {
    console.error('Spotify authorization error:', error);
    return null;
  }

  if (!code) {
    return null;
  }

  const codeVerifier = localStorage.getItem('spotify_code_verifier');
  
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    const data = await response.json();

    localStorage.removeItem('spotify_code_verifier');

    if (data.access_token) {
      console.log('Valid token retrieved', data);
      return data;
    } else {
      console.error('Failed to obtain access token:', data);
      return null;
    }
  } catch (err) {
    console.error('Error during token exchange:', err);
    return null;
  }
}

const getLocalStorageRefreshToken = () => {
  return localStorage.getItem('spotify_refresh_token');
}

const refreshToken = async (currentRefreshToken) => {
  
  if (!currentRefreshToken) {
    return null;
  }
  
  const url = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: currentRefreshToken,
    client_id: clientId,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    const data = await response.json();

    if (data.access_token) {
      return data;
    } else {
      console.error('Failed to refresh access token:', data);
      return null;
    }
  } catch (err) {
    console.error('Error during token refresh:', err);
    return null;
  }
}

export const retrieveRefreshedToken = async () => {
  return await refreshToken();
}