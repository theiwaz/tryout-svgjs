var svg = require('svg.js');
var drag = require('svg.draggable.js');


var App = {};

App.draw = SVG('drawing').size(906, 394);
App.Group = App.draw.nested();
App.viewbox = App.draw.viewbox(0, 0, 700, 200);
console.log(App.viewbox.zoom);

App.image = App.Group.image('/images/map.png').loaded(function(loader) {
    App.viewbox.size(loader.width, loader.height);
});


App.HalConfig = {
    'coordinates': [{
            'x': 0,
            'y': 0,
        },
        {
            'x': 28,
            'y': 0,
        },
        {
            'x': 28,
            'y': 95,
        },
        {
            'x': 66,
            'y': 95,
        },
        {
            'x': 66,
            'y': 120,
        },
        {
            'x': 0,
            'y': 120,
        }
    ]
};

App.GetCoordinates = function(coordobject) {
    var retval = "";
    coordobject.coordinates.forEach(function(element) {
        retval += element.x + ',' + element.y + ',';
    }, this);
    return retval;
};

App.Uitbouw = App.Group.rect(68, 73);
App.Uitbouw.x(135).y(52);
App.Uitbouw.attr({ 'fill': '#f06', 'fill-opacity': 0.5 });


App.SlaapKamer1 = App.Group.rect(38, 63);
App.SlaapKamer1.x(164).y(125);
App.SlaapKamer1.attr({ 'fill': '#a08', 'fill-opacity': 0.5 });

App.Hal = App.Group.polygon(App.GetCoordinates(App.HalConfig)).fill('#f10');
App.Hal.x(136).y(125);
App.Hal.attr({ 'fill': '#f10', 'fill-opacity': 0.5 });

App.Group.draggable();
console.log("Zoom: " + App.viewbox.zoom);
App.Group.size(50);

//var Uitbouw = draw.Uitbouw(100, 100).attr({ fill: '#f06' });