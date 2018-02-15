(function(){
	angular
		.module('BlurAdmin.pages.registro')
		.factory('mapService', function($q) {
        
        var gmaps = {};

        var map = null;
        gmaps.markers  = [];

        gmaps.init = function() {
            var options = {
                center: new google.maps.LatLng(-3.10719,-60.02613),
                zoom: 12,
                //disableDefaultUI: false,
                zoomControl: true,
                scaleControl: true    
            }
            map = new google.maps.Map(
                document.getElementById("google-maps"), options
            );

           
            this.places = new google.maps.places.PlacesService(map);

            map.addListener('click', function(e) {
                placeMarkerAndPanTo(e.latLng,map);
            });
        };

        function setMapOnAll(map) {
            for (var i = 0; i < gmaps.markers.length; i++) {
              gmaps.markers[i].setMap(map);
            }
          }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
           setMapOnAll(null);
        }
        
        
        function placeMarkerAndPanTo(latLng, map) {
            clearMarkers();
            gmaps.markers=[];
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
            gmaps.markers.push(marker);

            map.panTo(latLng);
        }

        gmaps.search = function(str) {
            var d = $q.defer();
            this.places.textSearch({query: str}, function(results, status) {
                if (status == 'OK') {
                    d.resolve(results[0]);
                }
                else d.reject(status);
            });
            return d.promise;
        }
        
        gmaps.redirecionar = function(res) {
            if(this.marker) this.marker.setMap(null);
            var bounds = new google.maps.LatLngBounds();
            
            bounds.extend(res.geometry.location);
            map.setCenter(res.geometry.location);
            map.fitBounds(bounds);
            map.setZoom(14);
        }
        
        return gmaps;
    });
})();