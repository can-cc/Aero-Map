(function () {
    alert('fuck')
    navigator.geolocation.getCurrentPosition(function(position){
        alert(position.coords.latitude + ',' + position.coords.longitude)
    }, function(){
        alert('error!')
    }, {enableHighAccuracy: true})
} ())
