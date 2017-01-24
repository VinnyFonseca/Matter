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
        infoWindow = new google.maps.InfoWindow({ content: html });

        infoWindow.open(map, marker);
        infoWindowVisible(true);
    });

    google.maps.event.addListener(infoWindow, 'closeclick', function() {
      infoWindowVisible(false);
    });
  },

  build: function(data) {
  	var options = {
      center: new google.maps.LatLng(data.Options.CenterLat, data.Options.CenterLng),
      zoom: data.Options.Zoom,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE
      },
      disableDoubleClickZoom: false,
      mapTypeControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
      },
      scale: matter.map.testHiRes() ? 2 : 1,
      scaleControl: false,
      scrollwheel: false,
      panControl: false,
      streetViewControl: false,
      draggable: true,
      overviewMapControl: false,
      overviewMapControlOptions: {
        opened: false
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: data.Themes[data.Options.Theme]
    };

  	var element = document.getElementById('map-canvas');
  	var map = new google.maps.Map(element, options);

  	for (i = 0; i < data.Markers.length; i++) {
  		marker = new google.maps.Marker({
  			icon: data.Markers[i].Marker,
  			position: new google.maps.LatLng(data.Markers[i].Lat, data.Markers[i].Lng),
  			map: map,
  			title: data.Markers[i].Title,
  			desc: data.Markers[i].Desc,
  			tel: data.Markers[i].Tel,
  			email: data.Markers[i].Email,
  			web: data.Markers[i].Url
  		});

  		matter.map.bindInfoWindow(marker, map, data.Markers[i].Title, data.Markers[i].Desc, data.Markers[i].Tel, data.Markers[i].Email, data.Markers[i].Url);
  	}
  },

  call: function() {
  	if ( window.google && google.maps ) {
  		for (var i = 0; i < document.querySelectorAll('.map-canvas').length; i++) {
        var feed = document.querySelectorAll('.map-canvas')[i].getAttribute('data-feed');
  			matter.data.get(feed, matter.map.build);

  			google.maps.event.addDomListener(window, "resize", function() {
  				var center = map.getCenter();
  				google.maps.event.trigger(map, "resize");
  				map.setCenter(center);
  			});
  		}

  		debug.log("~~ Google Maps API Request");
  	}
  },

  init: function() {
  	if ( document.querySelector('.map-wrapper') ) {
  		matter.script.load("//maps.googleapis.com/maps/api/js?key=&sensor=false&extension=.js&callback=matter.map.call");
  	}
  }
}
