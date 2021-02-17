
// CONTROLLER FUNCS//////////////////////////////////////

function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    };

    // One shot position getting or continus watch
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
    // navigator.geolocation.watchPosition(showLocation, handleLocationError);
};

function showLocation(position) {
    console.log(position);
    document.getElementById("latitude").innerHTML = position.coords.latitude;
    document.getElementById("longitude").innerHTML = position.coords.longitude;
    document.getElementById("accuracy").innerHTML = position.coords.accuracy;

    var date = new Date(position.timestamp);
    document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    initMap(position.coords.latitude, position.coords.longitude);
};

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    };
};




function initMap(lat, lng) {

    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 12
    };

    var map = new google.maps.Map(
        elMap,
        options
    );

    map.addListener("click", (ev) => {
        var lat = ev.latLng.lat();
        var lng = ev.latLng.lng();
        var locName = prompt('Location\'s Title:');
        onAddLoc(locName, lat, lng);
        onAddMarker(locName, lat, lng, map);
        console.log('lat,lang', lat, lng);
    });

    map.setCenter({ lat: 29.55779369335949, lng: 34.95098681009696 });
    new google.maps.Marker({ lat: 29.55779369335949, lng: 34.95098681009696 });

    renderLocations();

};

function onAddLoc(name, lat, lng) {
    addLocation(name, lat, lng);
    renderLocations();
};

function onAddMarker(name, lat, lng, map) {
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: name
    });
    marker.setMap(map);
    console.log(marker);

};

// function onDeleteMarker(locationId) {
//     var locat = getById(locationId);
//     console.log(locat);
//     var marker = 


// };

function onDeleteLoc(locationId) {
    deleteLocation(locationId);
    // onDeleteMarker();
    renderLocations();
};

function onUpdateLoc(locationId) {
    var newTitle = prompt('Enter Title:');
    updateLocation(locationId, newTitle);
    renderLocations();
};

function renderLocations() {
    var locations = gLocations;
    var strHtmls = locations.map(function(location) {
        return `
        <tr>
                    <td class="name-td">${location.name}</td>
                    <td class="latlng">Latitude: <br> ${location.lat} </td>
                    <td class="latlng">Longitude: <br> ${location.lng}</td>
                    <td><button onclick="onUpdateLoc('${location.id}')">Edit Title</button><button onclick="onDeleteLoc('${location.id}')">Delete</button></td>
        </tr>
        `
    });
    document.querySelector('.my-location-table').innerHTML = strHtmls.join('');
};
``

// SERIVICE FUNCS /////////////////////////////////////////////////////////

_createLocations();

function addLocation(name, lat, lng) {
    var newLocation = _createLocation(name, lat, lng);
    gLocations.push(newLocation);
    _saveLocationsToStorage();
    console.log(gLocations);
};

function updateLocation(locationId, newTitle) {
    console.log(locationId);
    var location = gLocations.find(function(location) {
        return location.id === locationId;
    })
    location.name = newTitle;
    _saveLocationsToStorage();
};

function deleteLocation(locationId) {
    var locationIdx = gLocations.findIndex(function(location) {
        return locationId === location.id
    })
    gLocations.splice(locationIdx, 1);
    _saveLocationsToStorage();
};

// function deleteMarker(locationId) {
//    var item = getById(locationId);
//    console.log(item);


// }

function _createLocation(name, lat, lng) {
    return {
        id: makeId(),
        name: name,
        lat: lat,
        lng: lng
    };
};

function _createLocations() {
    var locations = loadFromStorage(KEY);
    console.log(locations, ': locations')
    if (!locations || locations.length === 0) {
        locations = [{
                id: makeId(),
                name: 'Parents House',
                lat: 32.61026317356524,
                lng: 32.61026317356524
            },
            {
                id: makeId(),
                name: 'Seagul Island',
                lat: 32.60778607350922,
                lng: 32.60778607350922
            },
            {
                id: makeId(),
                name: 'Where I look For Sea-Shells',
                lat: 32.61918174209623,
                lng: 32.61918174209623
            }
        ];
    };
    gLocations = locations;
    _saveLocationsToStorage();
};


function getById(id) {
    var item = gLocations.find(function(item) {
        return id === item.id
    })
    return item
}

function _saveLocationsToStorage() {
    saveToStorage(KEY, gLocations);
};


