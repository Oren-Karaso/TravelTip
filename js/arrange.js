// CONTROLLER FUNCS//////////////////////////////////////

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