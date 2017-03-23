var svg = require('svg.js');
var drag = require('svg.draggable.js');
var $ = require('jquery');


var App = {};
App.ScaleFactor = 0.425;
App.draw = SVG('drawing').size(935, 647);
App.Group = App.draw.nested();
App.viewbox = App.draw.viewbox(0, 0, 935, 647);
console.log(App.viewbox.zoom);

App.image = App.Group.image('/images/KK405.jpg').loaded(function(loader) {
    App.viewbox.size(loader.width, loader.height);
});

App.GetCoordinates = function(coordobject) {
    var retval = "";

    //sort the coords
    coordobject.sort(function(a, b) {
        return parseFloat(a.Order) - parseFloat(b.Order);
    });

    coordobject.forEach(function(element) {
        retval += parseFloat(element.x) / App.ScaleFactor + ',' + parseFloat(element.y) / App.ScaleFactor + ',';
    }, this);

    return retval;
};

App.ProcessResponse = function(resp) {
    resp.forEach(function(element) {
        if (element.Coordinates && element.Coordinates.length > 0) {
            var retVal = App.GetCoordinates(element.Coordinates);
            console.log(retVal);
            App.Group.polygon(retVal).fill('#f06').stroke({ width: 1 }).opacity(0.5);
        }
    }, this);
};


// App.Group.draggable();
console.log("Zoom: " + App.viewbox.zoom);
App.Group.size(50);

//var Uitbouw = draw.Uitbouw(100, 100).attr({ fill: '#f06' });

var settings = {
    "async": false,
    "dataType": "jsonp",
    "crossDomain": true,
    "url": "https://web.plck.nl/v1.0.7/api/zonecoordinates/?DeviceId=99edc01e-00f7-4a7f-b030-f25a28c10b49&FloorId=324",
    "method": "GET",
    "headers": {
        "cache-control": "no-cache",
    }
};

callback = function(resp) {
    App.ProcessResponse(resp.value);
};

$.ajax(settings).done(function(response) {
    //App.ProcessResponse(response);
    console.log("stuff: " + response);
}).fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.log("Request Failed: " + err);
}).always(function() {
    console.log("finished");
});