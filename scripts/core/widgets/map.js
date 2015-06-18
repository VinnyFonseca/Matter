var map,
	themes = {
		Bentley: [
			{
				"featureType": "landscape",
				"stylers": [
					{
						"hue": "#F1FF00"
					},
					{
						"saturation": -27.4
					},
					{
						"lightness": 9.4
					},
					{
						"gamma": 1
					}
				]
			},
			{
				"featureType": "road.highway",
				"stylers": [
					{
						"hue": "#0099FF"
					},
					{
						"saturation": -20
					},
					{
						"lightness": 36.4
					},
					{
						"gamma": 1
					}
				]
			},
			{
				"featureType": "road.arterial",
				"stylers": [
					{
						"hue": "#00FF4F"
					},
					{
						"saturation": 0
					},
					{
						"lightness": 0
					},
					{
						"gamma": 1
					}
				]
			},
			{
				"featureType": "road.local",
				"stylers": [
					{
						"hue": "#FFB300"
					},
					{
						"saturation": -38
					},
					{
						"lightness": 11.2
					},
					{
						"gamma": 1
					}
				]
			},
			{
				"featureType": "water",
				"stylers": [
					{
						"hue": "#00B6FF"
					},
					{
						"saturation": 4.2
					},
					{
						"lightness": -63.4
					},
					{
						"gamma": 1
					}
				]
			},
			{
				"featureType": "poi",
				"stylers": [
					{
						"hue": "#9FFF00"
					},
					{
						"saturation": 0
					},
					{
						"lightness": 0
					},
					{
						"gamma": 1
					}
				]
			}
		],
		MapBox: [
			{
				"featureType": "water",
				"stylers": [
					{
						"saturation": 43
					},
					{
						"lightness": -11
					},
					{
						"hue": "#0088ff"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"hue": "#ff0000"
					},
					{
						"saturation": -100
					},
					{
						"lightness": 99
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#808080"
					},
					{
						"lightness": 54
					}
				]
			},
			{
				"featureType": "landscape.man_made",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ece2d9"
					}
				]
			},
			{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ccdca1"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#767676"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.stroke",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "poi",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "landscape.natural",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#b8cb93"
					}
				]
			},
			{
				"featureType": "poi.park",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi.sports_complex",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi.medical",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			},
			{
				"featureType": "poi.business",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			}
		],
		PastelTones: [
			{
				"featureType": "landscape",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 60 }
				]
			},{
				"featureType": "road.local",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 40 },
					{ "visibility": "on" }
				]
			},{
				"featureType": "transit",
				"stylers": [
					{ "saturation": -100 },
					{ "visibility": "simplified" }
				]
			},{
				"featureType": "administrative.province",
				"stylers": [
					{ "visibility": "off" }
				]
			},{
				"featureType": "water",
				"stylers": [
					{ "visibility": "on" },
					{ "lightness": 30 }
				]
			},{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{ "color": "#ef8c25" },
					{ "lightness": 40 }
				]
			},{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{ "visibility": "off" }
				]
			},{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
					{ "color": "#b6c54c" },
					{ "lightness": 40 },
					{ "saturation": -40 }
				]
			}
		],
		LightOnDarkGray: [
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#444444"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#f2f2f2"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"saturation": -100
					},
					{
						"lightness": 45
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "simplified"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#4f595d"
					},
					{
						"visibility": "on"
					}
				]
			}
		],
		Grayscale: [
			{
				"featureType": "administrative",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
					{
						"color": "#EAEAEA"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "all",
				"stylers": [
					{
						"color": "#838383"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "all",
				"stylers": [
					{
						"color": "#838383"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "all",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "all",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			}
		]
	};

var buildMap = function() {
	var init = function(data) {
		var mapOptions = {
			center: new google.maps.LatLng(data.Options[0].CenterLat, data.Options[0].CenterLng),
			zoom: data.Options[0].Zoom,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE
			},
			disableDoubleClickZoom: false,
			mapTypeControl: false,
			mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
			},
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
			styles: themes.MapBox
		};

		var mapElement = document.getElementById('map-canvas');
		map = new google.maps.Map(mapElement, mapOptions);

		var bindInfoWindow = function(marker, map, title, desc, telephone, email, web) {
			if (web.substring(0, 7) != "http://") {
				link = "http://" + web;
			} else {
				link = web;
			}

			var infoWindowVisible = (function() {
				var currentlyVisible = false;

				return function(visible) {
					if (visible !== undefined) {
						currentlyVisible = visible;
					}

					return currentlyVisible;
				};
			}());

			iw = new google.maps.InfoWindow();

			google.maps.event.addListener(marker, 'click', function() {
				// if (infoWindowVisible()) {
					iw.close();
					infoWindowVisible(false);
				// } else {
					var html = "<div class='gm-info'><h4>" + title + "</h4><p>" + desc + "<p><p>" + telephone + "<p><a href='mailto:" + email + "' >" + email + "<a><a href='" + link + "'' >" + web + "<a></div>";
					iw = new google.maps.InfoWindow(
					{
						content: html
					});
					iw.open(map, marker);
					infoWindowVisible(true);
				// }
			});

			google.maps.event.addListener(iw, 'closeclick', function() {
				infoWindowVisible(false);
			});
		}

		for (i = 0; i < data.Markers.length; i++) {

			marker = new google.maps.Marker( {
				icon: data.Markers[i].Marker,
				position: new google.maps.LatLng(data.Markers[i].Lat, data.Markers[i].Lng),
				map: map,
				title: data.Markers[i].Title,
				desc: data.Markers[i].Desc,
				tel: data.Markers[i].Tel,
				email: data.Markers[i].Email,
				web: data.Markers[i].Url
			});

			bindInfoWindow(marker, map, data.Markers[i].Title, data.Markers[i].Desc, data.Markers[i].Tel, data.Markers[i].Email, data.Markers[i].Url);
		}
	}

	if ( window.google && google.maps ) {
		$('.map-canvas').each(function() {
			dataRequest($(this).data("feed"), "GET", init);
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});
		})

		if ( config.application.debug ) console.log("Widget ~~ Map");
	}
}

var initMap = function() {
	if ( $('.map-wrapper').length ) {
		loadScript("//maps.googleapis.com/maps/api/js?key=&sensor=false&extension=.js&callback=buildMap");
	}
}