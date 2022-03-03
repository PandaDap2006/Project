function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey("AIzaSyCsCrizTo71fBTunwLvKlIcrdffmRgfexY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.

let search = ""

function execute() {
    search = document.getElementById("searchInput").value
    
    return gapi.client.youtube.search.list({
    "part": [
        "snippet"
    ],
    "maxResults": 40,
    "q": search
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                createVideoList(response)
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "827143033062-7hio9nscfsuvq36i7idk6d38ffbo1na1.apps.googleusercontent.com"});
});

function createVideoList(response) {
    var json = JSON.parse(JSON.stringify(response))
    document.getElementById("searchList").innerHTML = ""
    for (let i = 0; i < json.result.items.length; i++) {
        console.log(json.result.items[i].snippet.title)
        let video = document.createElement("div")
        let icon = document.createElement("img")
        let title = document.createElement("div")

        video.id = "video"
        video.onclick("startVideo("+ json.result.items[i].id.videoId +")")

        icon.src = json.result.items[i].snippet.thumbnails.medium.url
        icon.style.width = json.result.items[i].snippet.thumbnails.medium.width
        icon.style.height = json.result.items[i].snippet.thumbnails.medium.height

        title.innerHTML = json.result.items[i].snippet.title

        video.appendChild(icon)
        video.appendChild(title)
        document.getElementById("searchList").appendChild(video)
    }
}

var input = document.getElementById("searchInput");

input.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    event.preventDefault()
    execute()
  }
});

function startVideo(id) {
    window.open("https://www.youtube.com/embed/" + id)
}