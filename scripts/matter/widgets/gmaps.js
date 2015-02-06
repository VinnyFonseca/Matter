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
		SubtleGrayscale: [
			{
				"featureType": "landscape",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 65 },
					{ "visibility": "on" }
				]
			},{
				"featureType": "poi",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 51 },
					{ "visibility": "simplified" }
				]
			},{
				"featureType": "road.highway",
				"stylers": [
					{ "saturation": -100 },
					{ "visibility": "simplified" }
				]
			},{
				"featureType": "road.arterial",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": 30 },
					{ "visibility": "on" }
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
		/** /
			},{
				"featureType": "administrative.locality",
				"stylers": [
					{ "visibility": "off" }
				]
			},{
				"featureType": "administrative.neighborhood",
				"stylers": [
					{ "visibility": "on" }
				]
		/**/
			},{
				"featureType": "water",
				"elementType": "labels",
				"stylers": [
					{ "saturation": -100 },
					{ "lightness": -25 },
					{ "visibility": "on" }
				]
			},{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{ "saturation": -97 },
					{ "lightness": -25 },
					{ "hue": "#ffff00" }
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
		]
	};

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(51.507333, - 0.107806),
		zoom: 15,
		zoomControl: config.application.touch,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL
		},
		disableDoubleClickZoom: true,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
		},
		scaleControl: false,
		scrollwheel: !config.application.touch,
		panControl: config.application.touch,
		streetViewControl: false,
		draggable: !config.application.touch,
		overviewMapControl: true,
		overviewMapControlOptions: {
			opened: false
		},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: themes.PastelTones
	};

	var mapElement = document.getElementById('map-canvas');
	map = new google.maps.Map(mapElement, mapOptions);

	var locations = [
		['Purestone TFM', 'Award winning digital communications agency.', '02037355460', 'info@purestone.co.uk', 'http://www.purestone.co.uk', 51.5071911, -0.1076299, 'img/markers/default.png']
	];

	for (i = 0; i < locations.length; i++) {
		if (locations[i][1] == 'undefined') {
			description = '';
		} else {
			description = locations[i][1];
		}

		if (locations[i][2] == 'undefined') {
			telephone = '';
		} else {
			telephone = locations[i][2];
		}

		if (locations[i][3] == 'undefined') {
			email = '';
		} else {
			email = locations[i][3];
		}

		if (locations[i][4] == 'undefined') {
			web = '';
		} else {
			web = locations[i][4];
		}

		if (locations[i][7] == 'undefined') {
			markericon = '';
		} else {
			markericon = locations[i][7];
		}

		marker = new google.maps.Marker( {
			icon: markericon,
			position: new google.maps.LatLng(locations[i][5], locations[i][6]),
			map: map,
			title: locations[i][0],
			desc: description,
			tel: telephone,
			email: email,
			web: web
		});

		bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web);
	}


	function bindInfoWindow(marker, map, title, desc, telephone, email, web) {
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
			if (infoWindowVisible()) {
				iw.close();
				infoWindowVisible(false);
			} else {
				var html = "<div class='gm-info'><h4>" + title + "</h4><p>" + desc + "<p><p>" + telephone + "<p><a href='mailto:" + email + "' >" + email + "<a><a href='" + link + "'' >" + web + "<a></div>";
				iw = new google.maps.InfoWindow(
				{
					content: html
				});
				iw.open(map, marker);
				infoWindowVisible(true);
			}
		});

		google.maps.event.addListener(iw, 'closeclick', function() {
			infoWindowVisible(false);
		});
	}
}

function buildMap() {
	if ( window.google && google.maps ) {
		initialize();
		// google.maps.event.addDomListener(window, 'load', initialize);
		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});

		if (config.application.debug) console.log("Init ~~ Map");
	}
};

function initMap() {
	if ( $('.map-wrapper').length ) {
		loadScript("//maps.googleapis.com/maps/api/js?key=&sensor=false&extension=.js&callback=buildMap");
	}
};