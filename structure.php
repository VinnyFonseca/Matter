<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main">
	<div class="wrapper">

		<a href="#" class="anchor" id="structure"></a>

		<h2>Structure</h2>


		<ul>
			<li>
				<a href="#directory">Directory Listing</a>
			</li>
			<li>
				<a href="#breakdown">Directory Breakdown</a>
			</li>
		</ul>


		<hr>


		<a href="#" class="anchor" id="directory"></a>

		<h3>Directory Listing</h3>

<pre class="structure clean">
	.gitignore
	index.html

	<em>+ img</em>
	<em>+ favicon</em>
		apple-touch-icon-57.png
		apple-touch-icon-72.png
		apple-touch-icon-114.png
		favicon.ico
		favicon32.png
		mstile-144.png
		speeddial-160.png
	<em>+ markers</em>
		red.png

	<em>+ styles</em>
	<em>+ sass</em>
		<em>+ matter</em>
			_core.scss
			_forms.scss
			_helper.scss
			_conditional.scss
			_responsive.scss
		<em>+ vendor</em>
			_datepicker.scss
		_conditional.scss
		_config.scss
		_mixins.scss
		_responsive.scss
		global.scss
	boxsizing.htc
	global.css
	global.css.map

	<em>+ scripts</em>
	<em>+ matter</em>
		core.js
		forms.js
		gmaps.js
	<em>+ vendor</em>
		<em>+ locales *</em>
			<span class="emphasis">lang files</span>
		datepicker.js
		fastclick.js
		jquery.1.11.1.min.js
		jquery.highlight.js
		modernizr.full.min.js
		picturefill.min.js
		placeholders.min.js
	global.js

	<em>+ watch</em>
	watch.bat
	watch.sh
</pre>


		<hr>


		<a href="#" class="anchor" id="breakdown"></a>

		<h3>Directory Breakdown</h3>

		<p>
			This breakdown covers the most relevant files/folders, or the ones that require a bit of an explanation. If you'd like to know more about what a file does, feel free to open and modify it to your heart's content.
		</p>

		<br>

		<h4>Styles</h4>

		<dl>
			<dt>
				<code>pre/matter/</code>
			</dt>
			<dd>
				Core stylesheets folder.
			</dd>

			<dt>
				<code>pre/global.scss</code>
			</dt>
			<dd>
				This is your <strong>main</strong> styling file. All the partials are imported here. It's also the file that <code>watch</code> watches for changes, and compiles into <code>global.css</code> and <code>global.css.map</code> inside the <code>styles</code> folder.
			</dd>

			<dt>
				<code>pre/_config.scss</code>
			</dt>
			<dd>
				This file is your <strong>starting point</strong> and contains the configuration for <strong>font families</strong>, <strong>colours</strong>, <strong>spacing</strong>, <strong>decorative paramentes</strong> and <strong>responsive breakpoints</strong>.
			</dd>

			<dt>
				<code>pre/_mixins.scss</code>
			</dt>
			<dd>
				Add your own mixins. The framework uses compass for the other mixins.
			</dd>

			<dt>
				<code>pre/_responsive.scss</code>
			</dt>
			<dd>
				The breakpoints for the framework are alreayd defined. You can add your own breakpoints or follow the already provided ones to create your own responsive styling. Matter currently uses a <strong>desktop first</strong> approach, to be changed in the near future.
			</dd>

			<dt>
				<code>pre/_conditional.scss</code>
			</dt>
			<dd>
				Matter already provides conditional entries for all <strong>Internet Explorer</strong> versions. Use only if <strong>absolutely necessary</strong>, as it's possible to build applications that are perfectly cross browser without the use of conditional styling. See <code>pre/matter/_conditional.scss</code> to see how much conditional styling was used to make Matter compatible <strong>all the way down to IE7</strong>.
			</dd>

			<dt>
				<code>pre/matter/_helper.scss</code>
			</dt>
			<dd>
				This file contains classes that generally have a single property. Highlights are <code>.valign-middle</code> and <code>.animate</code>.
			</dd>
		</dl>

		<br>

		<h4>Scripts</h4>

		<dl>

			<dt>
				<code>scripts/matter</code>
			</dt>
			<dd>
				Core functionality.
			</dd>

			<dt>
				<code>scripts/vendor</code>
			</dt>
			<dd>
				This folder contains plugins and polyfills required to make Matter cross-browser and cross-platform. All minified.

				<ul>
					<li>
						<code>jquery.1.11.1.min.js</code> - <a href="http://jquery.com/download/" target="_blank">jQuery</a>
					</li>
					<li>
						<code>modernizr.full.min.js</code> - <a href="http://modernizr.com/" target="_blank">Modernizr</a>
					</li>
					<li>
						<code>fastclick.min.js</code> - <a href="http://ftlabs.github.io/fastclick/" target="_blank">FastClick</a>
					</li>
					<li>
						<code>placeholders.min.js</code> - <a href="http://jamesallardice.github.io/Placeholders.js/" target="_blank">Placeholders.js</a>
					</li>
					<li>
						<code>datepicker.min.js</code> - <a href="https://github.com/eternicode/bootstrap-datepicker" target="_blank">Bootstrap Datepicker</a>
					</li>
					<li>
						<code>jquery.highlight.min.js</code> - <a href="http://bartaz.github.io/sandbox.js/jquery.highlight.html" target="_blank">jQuery Highlight</a>
					</li>
					<li>
						<code>picturefill.min.js</code> - <a href="https://github.com/scottjehl/picturefill" target="_blank">Picturefill</a>
					</li>
				</ul>
			</dd>
		</dl>

		<br>

		<h4>Images</h4>

		<dl>
			<dt>
				<code>img/favicon</code>
			</dt>
			<dd>
				<strong>References:</strong>
				<br>
				<a href="http://css-tricks.com/favicon-quiz/" target="_blank">Favicon Quiz - CSS Tricks</a>.
				<br>
				<a href="http://realfavicongenerator.net/" target="_blank">Real Favicon Generator</a>. Upload a 512x512 or bigger version of your favicon and it does the job for you.
			</dd>

			<dt>
				<code>img/markers</code>
			</dt>
			<dd>
				<p>This folder contains the markers (or pins) for google maps. Create the designs you want and then change the path on <code>scripts/matter/gmaps.js</code>.</p>
			</dd>
		</dl>

		<br>

		<h4>Watch</h4>

		<p>
			Watch files for Windows, Mac and Linux are included in this folder. You can either run them by double clicking or by opening a command prompt/terminal, navigating to this directory and running <code>watch</code>. <strong>See:</strong> <a href="/">Get Started</a>.
		</p>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>