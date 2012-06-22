navigator.geolocation.getCurrentPosition(function(res) {
    console.log(res.coords.latitude, res.coords.longitude);
});