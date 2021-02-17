'use strict'
import { utilServices } from './util-service.js'
import { storageService } from './storage-service.js'

export const mapService = {
    getLocs,
    getgLocations,
    getgMarkers,
    getById,
    updateLocation,
    deleteLocation,
    addLocation
}

const KEY = 'locations';
var gLocations;
var gMarkers = [];




var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getgLocations() {
    return gLocations;
}

function getgMarkers() {
    return gMarkers;
}


function _createLocations() {
    var locations = loadFromStorage(KEY);
    console.log(locations, ': locations')
    if (!locations || locations.length === 0) {
        locations = [{

            id: makeId(),
            name: 'Parents House',
            lat: 32.61026317356524,
            lng: 32.61026317356524, 
            createdAt: new Date(),
            weather: 'fine'
        },
        {
            id: makeId(),
            name: 'Seagul Island',
            lat: 32.60778607350922,
            lng: 32.60778607350922,
            createdAt: new Date(),
            weather: 'fine'
        },
        {
            id: makeId(),
            name: 'Where I look For Sea-Shells',
            lat: 32.61918174209623,
            lng: 32.61918174209623,
            createdAt: new Date(),
            weather: 'fine'
        }
        ];
    };
    gLocations = locations;
    _saveLocationsToStorage();
}

function _createLocation(name, lat, lng) {
    return {
        id: makeId(),
        name: name,
        lat: lat,
        lng: lng
    };
}

function getById(id) {
    var item = gLocations.find(function (item) {
        return id === item.id
    })
    return item
}


function updateLocation(locationId, newTitle) {
    console.log(locationId);
    var location = gLocations.find(function (location) {
        return location.id === locationId;
    })
    location.name = newTitle;
    _saveLocationsToStorage();
};

function deleteLocation(locationId) {
    var locationIdx = gLocations.findIndex(function (location) {
        return locationId === location.id
    })
    gLocations.splice(locationIdx, 1);
    _saveLocationsToStorage();
};

function addLocation(name, lat, lng) {
    var newLocation = _createLocation(name, lat, lng);
    gLocations.push(newLocation);
    _saveLocationsToStorage();
    console.log(gLocations);
};

function _saveLocationsToStorage() {
    saveToStorage(KEY, gLocations);
}