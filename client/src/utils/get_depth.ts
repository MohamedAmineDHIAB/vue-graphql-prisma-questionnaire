function getDepthFromUrl() {
    // get the depth from the url
    const depthMatch = window.location.hash.slice(1);
    // if depthMatch is a int string then return the parsed int
    if (depthMatch && depthMatch.match(/^\d+$/)) {
        return parseInt(depthMatch);
    }
    return 0;
}
export default getDepthFromUrl;