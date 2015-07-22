<!DOCTYPE html>

<!--[if lt IE 7]> <html class="lt-ie10 lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie10 lt-ie9 lt-ie8 ie7"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie10 lt-ie9 ie8"> <![endif]-->
<!--[if IE 9]>    <html class="lt-ie10 ie9"> <![endif]-->
<!--[if gt IE 9]><!--> <html class=""> <!--<![endif]-->

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1">
		<meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="format-detection" content="telephone=no">

	    <!--[if IE]>
	    <meta http-equiv="Page-Enter" content="blendTrans(duration=0)" />
	    <meta http-equiv="Page-Exit" content="blendTrans(duration=0)" />
	    <![endif]-->

		<!-- Favicons -->
		<link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-touch-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon-180x180.png">
		<link rel="icon" type="image/png" href="img/favicon/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="img/favicon/favicon-194x194.png" sizes="194x194">
		<link rel="icon" type="image/png" href="img/favicon/favicon-96x96.png" sizes="96x96">
		<link rel="icon" type="image/png" href="img/favicon/android-chrome-192x192.png" sizes="192x192">
		<link rel="icon" type="image/png" href="img/favicon/favicon-16x16.png" sizes="16x16">
		<link rel="manifest" href="img/favicon/manifest.json">
		<meta name="msapplication-TileColor" content="#86669e">
		<meta name="msapplication-TileImage" content="img/favicon/mstile-144x144.png">
		<meta name="theme-color" content="#86669e">

		<title>Matter</title>

		<!-- Minified CSS - Includes all .scss from style folder -->
		<link rel="stylesheet" href="styles/build.css" type="text/css" media="all">

		<!--[if lt IE 9]>
		<script type="text/javascript" src="scripts/core/vendor/fallback/html5shiv-printshiv.js"></script>
		<![endif]-->
	</head>

	<body class="preload">
		<!--[if lt IE 8]>
		<p class="emphasis">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->

		<a href="#" class="anchor" id="get-started"></a>


		<div class="controls">
			<div class="button primary brochure-trigger">
				<img class="svg icon icon-brochure" src="img/icons/icon-brochure.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-brochure.png'" alt="Brochure icon">
				<div class="brochure-counter" data-count="0">&nbsp;</div>

				<div class="brochure-wrapper">
					<h4 class="brochure-title">
						Your brochure
					</h4>

					<div class="brochure-item-wrapper"></div>

					<div class="brochure-links">
						<div class="brochure-cta" data-overlay="brochure-share">
							<img class="svg icon icon-share" src="img/icons/icon-share.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-share.png'" alt="share icon">
							<span>Share</span>
						</div>
						<div class="brochure-cta" data-overlay="brochure-download">
							<img class="svg icon icon-download" src="img/icons/icon-download.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-download.png'" alt="download icon">
							<span>Download</span>
						</div>
					</div>
				</div>
			</div>

			<div class="button primary font-trigger">
				<span class="icon">A+</span>

				<div class="font-wrapper">
					<button class="font-item font-down">A&minus;</button>
					<button class="font-item font-reset primary">A</button>
					<button class="font-item font-up">A&plus;</button>
				</div>
			</div>

			<br>

			<div class="button tertiary rwd-debug hidden">
				<img class="svg icon icon-mobile" src="img/icons/icon-mobile.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-mobile.png'">
			</div>

			<a href="#get-started" class="button primary back-to-top">
				<img class="svg icon icon-arrow-up" src="img/icons/icon-arrow-up.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-arrow-up.png'">
			</a>
		</div>


		<div class="overlay" id="example">
			<div class="modal">
				<div class="overlay-close">
					<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-close.png'">
				</div>

				<h3>Example Overlay</h3>
			</div>
		</div>
		<div class="overlay" id="brochure-share">
			<div class="modal">
				<div class="overlay-close">
					<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-close.png'">
				</div>

				<h3>Share your brochure</h3>
			</div>
		</div>
		<div class="overlay" id="brochure-download">
			<div class="modal">
				<div class="overlay-close">
					<img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-close.png'">
				</div>

				<h3>Download your brochure</h3>
			</div>
		</div>
