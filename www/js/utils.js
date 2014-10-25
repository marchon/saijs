// Simple log function to keep the example simple
function log() {
    if (typeof console !== 'undefined') {
        console.log.apply(console, arguments);
    }
}
/*
 *
 *
 function generateUUID(){
 var d = new Date().getTime();
 var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
 var r = (d + Math.random()*16)%16 | 0;
 d = Math.floor(d/16);
 return (c=='x' ? r : (r&0x7|0x8)).toString(16);
 });
 return uuid;
 };

 // Status evaluator
 var Status = new function() {
 this.ok = function (status) {
 return (status === 200) ? true : false;
 };
 };

 *
 *
 * */