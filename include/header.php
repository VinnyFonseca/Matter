<body class="preload">
	<!--[if lt IE 8]>
	<p class="emphasis">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
	<![endif]-->

	<a href="#" class="anchor" id="get-started"></a>


	<div class="controls">
		<div class="button primary brochure-trigger">
			<img class="svg icon icon-brochure" src="img/icons/icon-brochure.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-brochure.png'" alt="Brochure icon">
			<div class="brochure-counter" data-count="0">&nbsp;</div>
		</div>

		<div class="button tertiary rwd-debug hidden">
			<img class="svg icon icon-mobile" src="img/icons/icon-mobile.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-mobile.png'">
		</div>

		<a href="#get-started" class="button primary back-to-top">
			<img class="svg icon icon-arrow-up" src="img/icons/icon-arrow-up.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-arrow-up.png'">
		</a>
	</div>


	<div class="notification-wrapper"></div>

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

	<div class="brochure-wrapper">
		<h4 class="brochure-title">
			Your brochure
			<!-- <script type="text/javascript">
				document.write(document.title);
			</script> -->
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


	<header>
		<nav class="block-reset">
			<!-- <?php
				foreach(glob('*.php') as $file) {
					echo "<a href='" . $file . "' class='nav-item'><span>" . ucfirst(preg_replace('/\\.[^.\\s]{3,4}$/', '', $file)) . "</span></a>";
				}
			?> -->
			<a href="index.php" class="nav-item"><span>Get Started</span></a>
			<a href="structure.php" class="nav-item"><span>Structure</span></a>
			<a href="grid.php" class="nav-item"><span>Grid</span></a>
			<a href="elements.php" class="nav-item"><span>Elements</span></a>
			<a href="imagery.php" class="nav-item"><span>Imagery</span></a>
			<a href="forms.php" class="nav-item"><span>Forms</span></a>
			<a href="widgets.php" class="nav-item"><span>Widgets</span></a>
			<a href="search.php" class="nav-item"><span>Search Engine</span></a>
			<!--
			<a href="tips.php" class="nav-item"><span>Tips &amp; Tricks</span></a>
			-->
		</nav>

		<div class="nav-trigger mobile-show">
			<img class="svg icon icon-menu" src="img/icons/icon-menu.svg" width="16" height="16" onerror="this.onerror=null;this.src='img/icons/icon-menu.png'">
		</div>

		<a href="index.php" class="logo valign-middle">
			<img src="img/logo.png" alt="">
			<span class="font-large font-custom">Matter</span>
		</a>

		<div class="scroll-progress"></div>
	</header>