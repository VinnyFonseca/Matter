<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">
	<div class="wrapper">

		<div class="sidebar">
			<div class="sidebar-trigger"></div>
			<h3>Widgets</h3>
		</div>



		<a href="#" class="anchor" id="notifications"></a>

		<h2>Notifications</h2>

		<code>notify(tone, delay);</code>

		<p>
			They are responsive and cross-browser compliant. They can be used for <strong>cookie messages</strong>, <strong>form validation</strong>, <strong>progress updates</strong>, <strong>user information</strong>, etc...
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Apply <code>data-notification="true"</code> to any element. Click trigger.
		</p>
		<p>
			Functionality is set by <code>data-message</code>, <code>data-tone</code>and <code>data-delay</code> attributes on the trigger element.
		</p>
		<p class="emphasis">
			Note: If the parameters above are ommitted, they will fallback to default parameters. <code>data-notification</code> and <code>data-message</code> are obligatory.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>delay: 5000</code>
			</dd>
			<dd>
				<code>tone: "default"</code> &nbsp;<small class="gray"><strong>default | success | warning | failure</strong></small>
			</dd>
		</dl>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="button primary" data-notification="true" data-message="Undeclared delay (default 5000ms)">
			Undeclared
		</div>
		<div class="button primary" data-notification="true" data-delay="0" data-message="Delay 0 seconds (persistent)">
			Declared 0
		</div>
		<div class="button primary" data-notification="true" data-delay="3000" data-message="Delay 3 seconds (3000ms)">
			Declared 3
		</div>

		<div class="button primary" data-notification="true" data-delay="0" data-tone="success" data-message="Success message.">
			Success
		</div>
		<div class="button primary" data-notification="true" data-delay="0" data-tone="warning" data-message="Warning message.">
			Warning
		</div>
		<div class="button primary" data-notification="true" data-delay="0" data-tone="failure" data-message="Failure message.">
			Failure
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="button primary" <span class="emphasis">data-notification="true" data-message="Success!" data-tone="success" data-delay="3000"</span>&gt;
	Delay 3000
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="slider"></a>

		<h2>Slider</h2>

		<p>
			Hand coded image slider with horizontal slide transitions. Supports multiple instances and infinite slides.
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Insert the example code below anywhere in your page, then define the specifics for each slider on the data attributes.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>

			<dd>
				<code>arrows: true</code>
			</dd>
			<dd>
				<code>bullets: true</code>
			</dd>
			<dd>
				<code>slideshow: true</code>
			</dd>
			<dd>
				<code>duration: 500</code>
			</dd>
			<dd>
				<code>interval: 5000</code>
			</dd>
			<dd>
				<code>threshold: 0</code>
			</dd>
			<dd>
				<code>trigger: $(".wrapper").width() / 6</code>
			</dd>
			<dd>
				<code>animation: "slide"</code> &nbsp;<small class="gray"><strong>slide | fade</strong></small>
			</dd>
		</dl>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="slider">
			<div class="slider-container-wrapper">
				<div class="slider-movable">
					<div class="slider-container">
						<img src="http://placehold.it/940x320" />
					</div>
					<div class="slider-container">
						<img src="http://placehold.it/941x320" />
					</div>
					<div class="slider-container">
						<img src="http://placehold.it/942x321" />
					</div>
				</div>
			</div>
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="slider" <span class="emphasis">data-bullets="true" data-arrows="true" data-slideshow="true" data-animation="slide"</span>&gt;
	&lt;div class="slider-container-wrapper"&gt;
		&lt;div class="slider-movable"&gt;
			&lt;div class="slider-container"&gt;
				&lt;img src="http://placehold.it/1280x420" /&gt;
			&lt;/div&gt;
			&lt;div class="slider-container"&gt;
				&lt;img src="http://placehold.it/1280x420" /&gt;
			&lt;/div&gt;
			&lt;div class="slider-container"&gt;
				&lt;img src="http://placehold.it/1280x420" /&gt;
			&lt;/div&gt;
		&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="overlays"></a>

		<h2>Overlays</h2>

		<p>
			Overlay elements, centered vertically and horizontally, that support any type of content.
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Create an overlay as per the example below, then simply use <code>data-overlay="<var>ID</var>"</code> on any clickable element to call that overlay.
		</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<button class="primary" data-overlay="example">Call "Example" overlay</button>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;button class="primary" <span class="emphasis">data-overlay="example"</span>&gt;Call "Example" overlay&lt;/button&gt;

&lt;div class="overlay" <span class="emphasis">id="example"</span>&gt;
	&lt;div class="modal"&gt;
		&lt;img class="svg icon icon-close" src="img/icons/icon-close.svg" width="16" height="16" /&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="tooltips"></a>

		<h2>Tooltips</h2>

		<p>
			Mouse-following tooltips on hover using attribute <code>data-tooltip</code>.
		</p>

		<p class="emphasis">
			Note: Tooltips are disabled on touch devices as it depends on <code>:hover</code> pseudo-selector.
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Add a class <code>.tooltip</code> and an attribute <code>data-tooltip</code> to any HTML element.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>position: "center"</code> &nbsp;<small class="gray"><strong>left | center | right</strong></small>
			</dd>
			<dd>
				<code>bound: true</code>
			</dd>
		</dl>

		<p>
			<strong>Demo:</strong>
		</p>

		<p>
			<button data-tooltip="Lorem ipsum Laborum">Hover this button</button>
		</p>

		<img src="http://placehold.it/960x300&text=Image,%20hover%20me" data-tooltip="Using data-tooltip 1" />

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;img src="http://placehold.it/1280x400&amp;text=Image,%20hover%20me" <span class="emphasis">data-tooltip="Tooltip Text"</span> /&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="maps"></a>

		<h2>Maps</h2>

		<p>
			<strong>Credit:</strong> <a href="https://mapbuildr.com/" target="_blank">Google Mapbuildr</a>.
		</p>

		<p>
			This specific map can be found at <a href="https://mapbuildr.com/buildr/kokih7" target="_blank">https://mapbuildr.com/buildr/kokih7</a>
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Insert the example code below anywhere in your page.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>styles: theme.Mapbox</code> &nbsp;<small class="gray"><strong>gmaps.js</strong></small>
			</dd>
		</dl>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="map-wrapper framed">
			<div id="map-canvas"></div>
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="map-wrapper"&gt;
	&lt;div id="map-canvas"&gt;&lt;/div&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="twitter"></a>

		<h2>Twitter</h2>

		<p>
			<strong>Credit:</strong> <a href="http://jasonmayes.com/projects/twitterApi/" target="_blank">Jason Mayes' twitter fetcher plugin</a>.
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<ol>
			<li>
				Insert the code example below wherever you wish to display the widget.
			</li>
			<li>
				Generate a widget ID.

				<ul>
					<li><a href="http://twitter.com" target="_blank">Twitter.com</a> > <strong>Settings</strong> > <strong>Widgets</strong></li>
					<li><strong>Create a new widget</strong> for a specific case, ie. "user time line" or "search".</li>
					<li><strong>Check</strong> "Exclude replies".</li>
					<li>Go back to <strong>Widgets</strong>, and <strong>Edit</strong> the one you just created.</li>
					<li><strong>Check the URL</strong> in your web browser, there should be a <strong>long number</strong>, ie. 345735908357048478</li>
					<li>That's the ID you must use on <code>global.js</code> for <code>config.twitter.id</code>.</li>
				</ul>
			</li>
		</ol>

		<p>
			<strong>Demo:</strong>
		</p>

		<div data-twitter="true"></div>

		<p>
			<strong>Example:</strong>
		</p>

		<pre>&lt;div data-twitter="true"&gt;&lt;/div&gt;</pre>



		<hr>



		<a href="#" class="anchor" id="tables"></a>

		<h2>Video Embeds</h2>

		<p>
			Supports youtube only.
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>Insert the example code below anywhere in your page.</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="video-frame" data-youtube-id="KaqC5FnvAEc"></div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="video-frame" <span class="emphasis">data-youtube-id="KaqC5FnvAEc"</span>&gt;&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="accessibility"></a>

		<h2>Accessibility</h2>

		<h4>Font size controls.</h4>

		<p>
			Two controls to change the font and one to reset. Use class <code>.primary</code> to add the "call to action" styling.
		</p>

		<p class="emphasis">
			Note: Chosen font size is saved in a cookie and is persistent throughout the site.
		</p>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>Insert the example code below anywhere in your page.</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>range: 3</code>
			</dd>
		</dl>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="font-control">
			<button class="font-down">A&minus;</button>
			<button class="font-reset primary">A</button>
			<button class="font-up">A+</button>
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="font-control"&gt;
	&lt;button class="font-down"&gt;A&minus;&lt;/button&gt;
	&lt;button class="font-reset primary"&gt;A&lt;/button&gt;
	&lt;button class="font-up"&gt;A+&lt;/button&gt;
&lt;/div&gt;
</pre>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>