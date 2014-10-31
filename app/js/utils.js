// Simple log function to keep the example simple
function log() {
    if (typeof console !== 'undefined') {
        console.log.apply(console, arguments);
    }
}