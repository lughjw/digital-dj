import axios from "axios";

// hash = window.location.hash
//         .substring(1)
//         .split("&")
//         .reduce(function (initial, item) {
//             if (item) {
//                 var parts = item.split("=");
//                 initial[parts[0]] = decodeURIComponent(parts[1]);
//             }
//             return initial;
//         }, {});

//         window.location.hash = "";

export default class Spotify {
    // function convertToCharacter
    static clientId = "dc03dc596dd24a0383323b67685ece79";

    static redirectUri = "http://localhost:3000/callback";
    static scopes = ["user-read-currently-playing", "user-read-playback-state"];

    static authorizeLink = `https://accounts.spotify.com/authorize?client_id=${
        Spotify.clientId
    }&response_type=token&redirect_uri=${
        Spotify.redirectUri
    }&scope=${Spotify.scopes.join("%20")}`;

    static userAccessToken = null;

    static collectAccessToken() {
        this.userAccessToken = window.location.hash
            .substring(1)
            .split("&")
            .reduce(function (initial, item) {
                if (item) {
                    var parts = item.split("=");
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});

        // window.location.hash = "";
    }
}
