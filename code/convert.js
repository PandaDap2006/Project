let newUrl

function convert() {
    let url = document.getElementById("input").value
    if (url.includes("https://www.youtube.com/watch?v=")) {
        newUrl = url.replace("https://www.youtube.com/watch?v=","https://www.youtube.com/embed/")
        document.getElementById("copy").hidden = false
        document.getElementById("copy").innerHTML = "Copy to clipboard"
        console.log("valid link " + newUrl)
    } else {
        console.log("invalid link")
    }
}

function copyClipboard() {
    navigator.clipboard.writeText(newUrl);
}