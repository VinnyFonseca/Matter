matter.map = {
  testHiRes: function() {
      var dpr = window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI) || 1;
      if ( dpr ) return (dpr > 1);
  },

  bindInfoWindow: function(marker, map, title, desc, telephone, email, web) {
    infoWindow = new google.maps.InfoWindow();

    var infoWindowVisible = (function() {
      var isVisible = false;

      return function(visible) {
        if ( visible !== undefined ) {
          isVisible = visible;
        }

        return isVisible;
      };
    }());

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.close();
      infoWindowVisible(false);

      var link = web.substring(0, 7) != "http://" ? "http://" + web : web;
      var html = "<div class='gm-info'>\
                    <h4>" + title + "</h4>\
                    <p>" + desc + "<p>\
                    <p>" + telephone + "<p>\
                    <a href='mailto:" + email + "' >" + email + "<a>\
                    <a href='" + link + "'' >" + web + "<a>\
                  </div>";
      infoWindow = new google.maps.InfoWindow({content: html});

      infoWindow.open(map, marker);
      infoWindowVisible(true);
    });

    google.maps.event.addListener(infoWindow, 'closeclick', function() {
      infoWindowVisible(false);
    });
  },

  build: function(data) {
  	var options = {
      center: new google.maps.LatLng(data.Options.centerLat, data.Options.centerLng),
      zoom: data.Options.zoom,
      zoomControl: data.Options.zoomControl,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      },
      disableDoubleClickZoom: data.Options.disableDoubleClickZoom,
      mapTypeControl: data.Options.mapTypeControl,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      },
      scale: matter.map.testHiRes() ? 2 : 1,
      scaleControl: data.Options.scaleControl,
      scrollwheel: data.Options.scrollwheel,
      panControl: data.Options.panControl,
      streetViewControl: data.Options.streetViewControl,
      draggable: data.Options.draggable,
      overviewMapControl: data.Options.overviewMapControl,
      overviewMapControlOptions: data.Options.overviewMapControlOptions,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: data.Themes[data.Options.theme]
    };

  	var element = document.getElementById('map-canvas');
  	var map = new google.maps.Map(element, options);

  	for ( var i = 0; i < data.Markers.length; i++ ) {
      var marker = data.Markers[i];
  		var pin = new google.maps.Marker({
  			icon: marker.icon,
  			position: new google.maps.LatLng(marker.lat, marker.lng),
  			map: map,
  			title: marker.title,
  			desc: marker.desc,
  			tel: marker.tel,
  			email: marker.email,
  			web: marker.url
  		});

  		matter.map.bindInfoWindow(pin, map, marker.title, marker.desc, marker.tel, marker.email, marker.url);
  	}

    google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });
  },

  call: function() {
  	if ( window.google && google.maps ) {
      var map = document.querySelectorAll('.map-canvas');

  		for (var i = 0; i < map.length; i++) {
  			matter.data.get(map[i].getAttribute('data-feed'), this.build);
  		}

  		debug.log("~~ Google Maps API Request");
  	}
  },

  init: function() {
  	if ( document.querySelector('.map-wrapper') ) {
  		matter.script.load("//maps.googleapis.com/maps/api/js?key=&extension=.js&callback=matter.map.call");

    	if ( matter.config.application.touch ) {
    		$(".map-canvas").addClass("map-mobile"); // Fixes image distortion on Google Maps - See styles/core/widgets/_map.scss.
    	}
  	}
  }
}