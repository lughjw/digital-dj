import axios from 'axios';
/** 
 * A class designed to assist in communicating with the Rails API.
 * By default the BASE_URL is http://localhost:4000.
*/
export default class API{
    static BASE_URL = "http://localhost:4000";
    
    /**
     * 
     * @param {number} user The id of the user
     * @param {string} playlist The spotify_id of the playlist
     */
    static addPlaylistToUser(user, playlist){
        // Send to backend
        axios.post(BASE_URL + `/${user.id}/playlists`, playlist)
        .then(r => r.json())
        .then(r => console.log("Response from addPlaylistToUser",r))
    };

    /**
     * @param {number} user The id of the user.
     * @param {string} playlist The id of the playlist to be added to.
     * @param {string} song The id of the song to be added (do a search first to find it.)
     */
    static addSongToPlaylist(userId, playlistId, songId) {
        axios.post(BASE_URL + `/${userId}/playlists/${playlistId}`, songId)
        .then(r => r.json())
        .then(r => console.log("Response from addPlaylistToUser",r))
    };

    /**
     * Will send the user to the spotify login screen to verify credentials.
     * Responds with the user's id.
     */
    static spotifyLogin() {
        // should respond with the verified user's token or user_id.
        return axios.get(this.BASE_URL + "/login")
        // .then(r => r.json())
        // .then(r => console.log("Response from spotifyLogin",r))
        // fetch(this.BASE_URL + "/login")
    };

    /**
     * 
     * @param {string} spotifyToken 
     */
    static createSession(spotifyToken) {
        return fetch(this.BASE_URL + "/sessions/create?spotify_token="+spotifyToken)
    }

    /**
     * Takes the currently logged in user and logs them out. 
     * If there is no currently logged in user then nothing is changed.
    */
    static spotifyLogout(userId) {
        axios.post(this.BASE_URL + "/logout", userId)
        .then(r => r.json())
        .then(r => console.log("Response from spotifyLogout"))
    };

    /**
     * @param {string} searchText What to search for
     * @param {string} type The type of the media (podcast, track, song)
     */
    static spotifySearch(searchText, type="track") {
        axios.get(this.BASE_URL+`/search?text=${searchText}&type=${type}`)
        .then(r => r.json())
        .then(r => console.log("Response from spotifySearch", r))
    };

}