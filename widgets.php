<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main">
	<div class="wrapper">

		<a href="#" class="anchor" id="widgets"></a>

		<h2>Widgets</h2>


		<ul>
			<li>
				<a href="#accessibility">Accessibility</a>
			</li>
			<li>
				<a href="#notifications">Notifications</a>
			</li>
			<li>
				<a href="#tooltips">Tooltips</a>
			</li>
			<li>
				<a href="#slider">Slider</a>
			</li>
			<li>
				<a href="#maps">Maps</a>
			</li>
			<li>
				<a href="#twitter">Twitter</a>
			</li>
		</ul>



		<hr>



		<a href="#" class="anchor" id="accessibility"></a>

		<h3>Accessibility</h3>

		<h4>Font size controls.</h4>

		<p>Two controls to change the font and one to reset. Use class <code>.primary</code> to add the "call to action" styling.</p>

		<h4>Usage:</h4>

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
			<strong>Example:</strong>
		</p>

<pre>
&lt;button class="font-down"&gt;A&minus;&lt;/button&gt;
	&lt;button class="font-reset primary"&gt;A&lt;/button&gt;
&lt;button class="font-up"&gt;A+&lt;/button&gt;
</pre>

		<p>
			<strong>Demo:</strong>
		</p>

		<button class="font-down">A&minus;</button>
		<button class="font-reset primary">A</button>
		<button class="font-up">A+</button>



		<hr>



		<a href="#" class="anchor" id="notifications"></a>

		<h3>Notifications</h3>

		<p>
			There are two notification styles. They are responsive, liquid, and cross-browser compliant. They can be used for <strong>cookie messages</strong>, <strong>form validation</strong>, <strong>progress updates</strong>, <strong>user information</strong>, etc...
		</p>

		<div class="button primary notification-trigger" data-message="Test message.">
			Undeclared type and delay
		</div>
		<a href="#get-started" class="button primary notification-trigger" data-type="bar" data-delay="0" data-message="Another message.">
			Type bar, delay 0
		</a>
		<div class="button primary notification-trigger" data-type="float" data-delay="5000" data-message="And another.">
			Type float, delay 5000
		</div>

		<p class="emphasis">Note: <code>"bar"</code> has delay 0, so it stays indefinitely, while <code>"float"</code> has a 5000ms delay.</p>

		<br>

		<h4>Usage:</h4>

		<p>
			Apply class <code>.notification-trigger</code> to element.
		</p>
		<p>
			Functionality is set by <code>data-message</code>, <code>data-tone</code>, <code>data-type</code> and <code>data-delay</code> attributes on the trigger element. If ommitted, they fallback to default parameters.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>type: "float"</code> &nbsp;<small class="gray"><strong>float | bar</strong></small>
			</dd>
			<dd>
				<code>delay: 5000</code>
			</dd>
			<dd>
				<code>tone: "default"</code> &nbsp;<small class="gray"><strong>default | success | warning | failure</strong></small>
			</dd>
		</dl>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
	&lt;div class="button primary notification-trigger" data-type="float" data-delay="5000" data-message="Sample notification."&gt;
	Type float, delay 5000
	&lt;/div&gt;
</pre>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="button primary notification-trigger" data-type="float" data-delay="5000" data-message="Sample notification.">
			Type float, delay 5000
		</div>



		<hr>



		<a href="#" class="anchor" id="tooltips"></a>

		<h3>Tooltips</h3>

		<p>
			Mouse-following tooltips on hover using attribute <code>data-tooltip</code>.
		</p>

		<p>
			<button class="tooltip" data-tooltip="Lorem ipsum Laborum">Hover this button</button>
		</p>

		<p class="emphasis">
			Note: Tooltips are disabled on touch devices as it depends on <code>:hover</code> pseudo-selector.
		</p>

		<br>

		<h4>Usage:</h4>

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
			<strong>Example:</strong>
		</p>

<pre>
&lt;img src="http://placehold.it/1280x400&text=Image,%20hover%20me" class="tooltip" data-tooltip="Using data-tooltip 1" /&gt;
</pre>

		<p>
			<strong>Demo:</strong>
		</p>

		<img src="http://placehold.it/1280x400&text=Image,%20hover%20me" class="tooltip" data-tooltip="Using data-tooltip 1" />



		<hr>



		<a href="#" class="anchor" id="slider"></a>

		<h3>Slider</h3>

		<p>
			Hand coded image slider with horizontal slide transitions. Supports multiple instances and infinite slides.
		</p>

		<br>

		<h4>Usage:</h4>

		<p>
			Insert the example code below anywhere in your page, then define the specifics for each slider on the data attributes.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			</dt>
			<dd>
				<code>duration: 1000</code>
			</dd>
			<dd>
				<code>interval: 5000</code>
			</dd>
		</dl>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="slider" data-bullets="true" data-arrows="true" data-slideshow="true"&gt;
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

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="slider" data-bullets="true" data-arrows="true" data-slideshow="true">
			<div class="slider-container-wrapper">
				<div class="slider-movable">
					<div class="slider-container">
						<img src="http://placehold.it/1281x420" />
					</div>
					<div class="slider-container">
						<img src="http://placehold.it/1282x420" />
					</div>
					<div class="slider-container">
						<img src="http://placehold.it/1283x420" />
					</div>
				</div>
			</div>
		</div>



		<hr>



		<a href="#" class="anchor" id="maps"></a>

		<h3>Maps</h3>

		<p>
			<strong>Credit:</strong> <a href="https://mapbuildr.com/" target="_blank">Google Mapbuildr</a>.
		</p>

		<p>
			This specific map can be found at <a href="https://mapbuildr.com/buildr/kokih7" target="_blank">https://mapbuildr.com/buildr/kokih7</a>
		</p>

		<br>

		<h4>Usage:</h4>

		<p>
			Insert the example code below anywhere in your page.
		</p>

		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>styles: theme.Bentley</code> &nbsp;<small class="gray"><strong>gmaps.js</strong></small>
			</dd>
		</dl>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="map-wrapper"&gt;
	&lt;div id="map-canvas"&gt;&lt;/div&gt;
&lt;/div&gt;
</pre>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="map-wrapper framed">
			<div id="map-canvas"></div>
		</div>



		<hr>



		<a href="#" class="anchor" id="twitter"></a>

		<h3>Twitter</h3>

		<p>
			<strong>Credit:</strong> <a href="http://jasonmayes.com/projects/twitterApi/" target="_blank">Jason Mayes' twitter fetcher plugin</a>.
		</p>

		<h4>Usage</h4>

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
			<strong>Example:</strong>
		</p>

		<code>&lt;div id="widget-twitter"&gt;&lt;/div&gt;</code>

		<p>
			<strong>Demo:</strong>
		</p>

		<h4>Tweet Timeline</h4>

		<div id="widget-twitter"></div>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>