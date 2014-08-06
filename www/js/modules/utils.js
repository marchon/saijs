'use strict';

// Simple log function to keep the example simple
function log() {
    if (typeof console !== 'undefined') {
        console.log.apply(console, arguments);
    }
}

function inArray(item, array) {
    return (array.indexOf(item) !== -1) ? true : false;
}



// Format For Grid View
function getColMatrix(data, colCnt) {
    var i, d, cnt = 1, row = {cols: []}, rows = [];
    if (data.length >= colCnt) {
        for (i in data) {
            d = data[i];
            row.cols.push(d);
            if (cnt % colCnt === 0) {
                rows.push(row);
                row = {cols: []};
            }
            cnt++;
        }
    } else {
        for (i in data) {
            d = data[i];
            row.cols.push(d);
        }
        rows.push(row);
        row = {cols: []};
    }
    return rows;
}

// Status evaluator
function Status() {
    this.ok = function (status) {
        return (status === 200) ? true : false;
    };
}

var Status = new Status();

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};
