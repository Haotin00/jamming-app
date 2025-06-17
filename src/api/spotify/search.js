const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search"
const SEARCH_TYPE = "track"
const RESULT_LIMIT = 10

export const spotifyResearch = async (search, token) => {

    const params = new URLSearchParams({
        q: search,
        type: SEARCH_TYPE,
        limit: RESULT_LIMIT
    });

    try {
        const response = await fetch(`${SEARCH_ENDPOINT}?${params.toString()}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok)
        {
            //! TODO : Handle possible errors => wrong tokens, wrong query..
            throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error)
    {
        console.error("Search error:", error);
    }
}