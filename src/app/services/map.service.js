(function(){
	angular
		.module('BlurAdmin.pages.registro')
		.service('mapService', function($q) {
    
        this.init = function() {

            var options = {
                center: new google.maps.LatLng(-3.10719,  -60.02613),
                zoom: 12,
                disableDefaultUI: false,
                zoomControl: true,
                scaleControl: true    
            }
            this.map = new google.maps.Map(
                document.getElementById("google-maps"), options
            );
            this.places = new google.maps.places.PlacesService(this.map);
        }
        
        this.search = function(str) {
            var d = $q.defer();
            this.places.textSearch({query: str}, function(results, status) {
                if (status == 'OK') {
                    d.resolve(results[0]);
                }
                else d.reject(status);
            });
            console.log(d.promise);
            return d.promise;
        }
        
        this.addMarker = function(res) {
            if(this.marker) this.marker.setMap(null);
            var bounds = new google.maps.LatLngBounds();
            this.marker = new google.maps.Marker({
                map: this.map,
                position: res.geometry.location,
                animation: google.maps.Animation.DROP
            });
            bounds.extend(this.marker.getPosition());
            this.map.setCenter(res.geometry.location);
            this.map.fitBounds(bounds);
            this.map.setZoom(14);
        }
        
    });
})();