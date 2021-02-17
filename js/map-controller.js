'use strict'
import { mapService } from './services/map-service.js'

const API_KEY = 'AIzaSyB65mRB3HlbxYhKGjVRdCRGcIvyg8iRNME';

const GEO_API = 'https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters'

var gMap;
console.log('Reday');

mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {

    document.querySelector('.map-container').addEventListener('click', (ev) => {
        console.log('Aha!', ev.target);
        panTo(35.6895, 139.6917);
    })

    initMap()
        .then(() => {
            addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(() => console.log('INIT MAP ERROR'));

    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

// function getPosition() {
//     if (!navigator.geolocation) {
//         alert("HTML5 Geolocation is not supported in your browser.");
//         return;
//     };

//     // One shot position getting or continus watch
//     navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
//     // navigator.geolocation.watchPosition(showLocation, handleLocationError);
// }


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function onAddLoc(name, lat, lng) {
    addLocation(name, lat, lng);
    renderLocations();
}

function onAddMarker(name, lat, lng, map) {
    var marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: name
    });
    marker.setMap(map);
    console.log(marker);

}

function onUpdateLoc(locationId) {
    var newTitle = prompt('Enter Title:');
    updateLocation(locationId, newTitle);
    renderLocations();
}

function onDeleteLoc(locationId) {
    deleteLocation(locationId);
    // onDeleteMarker();
    renderLocations();
}

function onDeleteMarker(locationId) {
    var locat = getById(locationId);
    console.log(locat);
    var marker;
}

function renderLocations() {
    var locations = gLocations;
    var strHtmls = locations.map(function (location) {
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
}
