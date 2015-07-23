<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">

	<div class="sidebar">
		<div class="sidebar-trigger"></div>
		<h3>Widgets</h3>
	</div>


	<div class="wrapper">

		<a href="#" class="anchor" id="notifications"></a>

		<h2>Notifications</h2>

		<code>notify(tone, delay);</code>

		<p>
			They are responsive and cross-browser compliant. They can be used for <strong>cookie messages</strong>, <strong>form validation</strong>, <strong>progress updates</strong>, <strong>user information</strong>, etc...
		</p>


		<p>
			<strong>Demo:</strong>
		</p>

		<div class="button primary" data-notification="true" data-message="Undeclared delay (default 5000ms)">
			Undeclared delay
		</div>
		<div class="button primary" data-notification="true" data-message="Delay 0 seconds (persistent)" data-delay="0">
			Declared 0 delay
		</div>
		<div class="button primary" data-notification="true" data-message="Delay 3 seconds (3000ms)" data-delay="3000">
			Declared 3(s) delay
		</div>
		<br>
		<div class="button primary" data-notification="true" data-message="Success message." data-delay="0" data-tone="success">
			Success tone
		</div>
		<div class="button primary" data-notification="true" data-message="Warning message." data-delay="0" data-tone="warning">
			Warning tone
		</div>
		<div class="button primary" data-notification="true" data-message="Failure message." data-delay="0" data-tone="failure">
			Failure tone
		</div>


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
			<strong>Code example:</strong>
		</p>

<pre>
&lt;div class="button primary" <span class="emphasis">data-notification="true" data-{{message|delay|tone}}="{{value}}"</span>&gt;
	Delay 3000
&lt;/div&gt;
</pre>

		<p class="emphasis">
			Note: If any the data attributes are ommitted, they will fallback to their defaults. <code>data-notification</code> and <code>data-message</code> are obligatory.
		</p>



		<hr>



		<a href="#" class="anchor" id="slider"></a>

		<h2>Slider</h2>

		<p>
			Hand coded image slider with horizontal slide transitions. Supports multiple instances and infinite slides.
		</p>


		<p>
			<strong>Demo:</strong>
		</p>

		<div class="slider full" data-slider="true" data-slideshow="false" data-thumbnails="true">
			<div class="slide thumb" data-thumb="1.jpg"></div>
			<div class="slide thumb" data-thumb="2.jpg"></div>
			<div class="slide thumb" data-thumb="3.jpg"></div>
			<div class="slide thumb" data-thumb="4.jpg"></div>
			<div class="slide thumb" data-thumb="5.jpg"></div>
			<div class="slide thumb" data-thumb="6.jpg"></div>
			<div class="slide thumb" data-thumb="7.jpg"></div>
			<div class="slide thumb" data-thumb="8.jpg"></div>
			<div class="slide thumb" data-thumb="9.jpg"></div>
			<div class="slide thumb" data-thumb="10.jpg"></div>
		</div>

		<div class="slider fifth" data-slider="true">
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 1</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 2</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 3</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 4</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 5</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 6</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 7</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 8</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
			<div class="slide">
				<div class="cell">
					<h3 class="emphasis">Test 9</h2>
					<p>This is a text slide</p>
					<strong>Supports any type of data</strong>
				</div>
			</div>
		</div>

		<div class="slider third" data-slider="true">
			<div class="slide thumb" data-thumb="1.jpg"></div>
			<div class="slide thumb" data-thumb="2.jpg"></div>
			<div class="slide thumb" data-thumb="3.jpg"></div>
			<div class="slide thumb" data-thumb="4.jpg"></div>
			<div class="slide thumb" data-thumb="5.jpg"></div>
			<div class="slide thumb" data-thumb="6.jpg"></div>
			<div class="slide thumb" data-thumb="7.jpg"></div>
			<div class="slide thumb" data-thumb="8.jpg"></div>
			<div class="slide thumb" data-thumb="9.jpg"></div>
			<div class="slide thumb" data-thumb="10.jpg"></div>
		</div>


		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>

			<dd>
				<code>nav: true</code>
			</dd>
			<dd>
				<code>arrows: true</code>
			</dd>
			<dd>
				<code>thumbnails: false</code>
			</dd>
			<dd>
				<code>animation: "slide"</code> &nbsp;<small class="gray"><strong>slide | fade</strong></small>
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
		</dl>


		<p>
			<strong>Code example:</strong>
		</p>

<pre>
&lt;div class="slider" <span class="emphasis">data-slider="true" data-{{nav|arrows|thumbnails|slideshow|animation}}="{{value}}"</span>&gt;
	&lt;div class="slide"&gt;
		&lt;img src="http://placehold.it/959x350" /&gt;
	&lt;/div&gt;
	&lt;div class="slide"&gt;
		&lt;img src="http://placehold.it/960x350" /&gt;
	&lt;/div&gt;
	&lt;div class="slide"&gt;
		&lt;img src="http://placehold.it/961x350" /&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>

		<p>
			<strong>Image gallery example:</strong>
		</p>

<pre>
&lt;div class="slider" <span class="emphasis">data-slider="true" data-thumbnails="true"</span>&gt;
	&lt;div class="slide <span class="emphasis">thumb</span>" <span class="emphasis">data-thumb="image/path/here.jpg"</span>&gt;&lt;/div&gt;
	&lt;div class="slide <span class="emphasis">thumb</span>" <span class="emphasis">data-thumb="image/path/here.jpg"</span>&gt;&lt;/div&gt;
	&lt;div class="slide <span class="emphasis">thumb</span>" <span class="emphasis">data-thumb="image/path/here.jpg"</span>&gt;&lt;/div&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="overlays"></a>

		<h2>Overlays</h2>

		<p>
			Overlay elements, centered vertically and horizontally, that support any type of content.
		</p>


		<p>
			<strong>Demo:</strong>
		</p>

		<button class="primary" data-overlay="example">Call id="example" overlay</button>


		<p>
			<strong>Code example:</strong>
		</p>

<pre>
&lt;button class="primary" <span class="emphasis">data-overlay="example"</span>&gt;Call id="example" overlay&lt;/button&gt;


// Add the block below right after the opening of the &lt;body&gt; tag.

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
			<strong>Demo:</strong>
		</p>

		<p>
			<button data-tooltip="Lorem ipsum Laborum">Hover this button</button>
		</p>

		<img src="http://placehold.it/1280x350&text=Image,%20hover%20me" data-tooltip="Using data-tooltip 1" />


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
			<strong>Code example:</strong>
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
			This map requires a data-feed attribute that calls a json config file.
		</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="map-wrapper framed">
			<div id="map-canvas" class="map-canvas" data-feed="scripts/dev/data/map-config.json"></div>
		</div>


		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>styles: theme.Mapbox</code> &nbsp;<small class="gray"><strong>gmaps.js</strong></small>
			</dd>
		</dl>


		<p>
			<strong>Code example:</strong>
		</p>

<pre>
&lt;div class="map-wrapper"&gt;
	&lt;div <span class="emphasis">id="map-canvas" class="map-canvas" data-feed="scripts/dev/data/map-config.json"</span>&gt;&lt;/div&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="twitter"></a>

		<h2>Twitter</h2>

		<p>
			<strong>Credit:</strong> <a href="http://jasonmayes.com/projects/twitterApi/" target="_blank">Jason Mayes' twitter fetcher plugin</a>.
		</p>


		<p>
			<strong>Demo:</strong>
		</p>

		<div data-twitter="true"></div>


		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>

			<dd>
				<code>widgetId: '492660537293938688'</code>
			</dd>
			<dd>
				<code>startAt: 0</code>
			</dd>
			<dd>
				<code>maxTweets: 3</code>
			</dd>
			<dd>
				<code>enableLinks: true</code>
			</dd>
			<dd>
				<code>showUser: true</code>
			</dd>
			<dd>
				<code>showTime: true</code>
			</dd>
			<dd>
				<code>showRetweet: false</code>
			</dd>
			<dd>
				<code>showFollow: false</code>
			</dd>
			<dd>
				<code>showInteraction: false</code>
			</dd>
		</dl>


		<p>
			<strong>Usage:</strong>
		</p>

		<ol>
			<li>
				Insert the code example where you wish to display the widget.
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
			<strong>Code example:</strong>
		</p>

<pre>
	&lt;div data-twitter="true" data-{{widgetId|startAt|maxTweets}}="{{value}}"&gt;&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="tables"></a>

		<h2>Video Embeds</h2>

		<p>
			Supports youtube and vimeo.
		</p>


		<p>
			<strong>Demo:</strong>
		</p>

		<div class="row">
			<div class="column" data-span="6">
				<p class="emphasis">
					Youtube iFrame
				</p>

				<iframe width="1280" height="600" src="https://www.youtube.com/embed/uxfuuvjT1OY" frameborder="0" allowfullscreen></iframe>
			</div>
			<div class="column" data-span="6">
				<p class="emphasis">
					Youtube Video
				</p>

				<div class="video-frame" data-video-id="lS5HyAFwLAU" data-video-service="youtube"></div>
			</div>
			<div class="column" data-span="6">
				<p class="emphasis">
					Vimeo iFrame
				</p>

				<iframe src="https://player.vimeo.com/video/47911018" frameborder="0" allowfullscreen></iframe>
			</div>
			<div class="column" data-span="6">
				<p class="emphasis">
					Vimeo Video
				</p>

				<div class="video-frame" data-video-id="122325664" data-video-service="vimeo"></div>
			</div>
		</div>


		<p>
			<strong>Code example:</strong>
		</p>

		<p class="emphasis">
			Youtube Video
		</p>

<pre>
&lt;div class="video-frame" <span class="emphasis">data-video-id="lS5HyAFwLAU" data-video-service="youtube"</span>&gt;&lt;/div&gt;
</pre>

		<p class="emphasis">
			Youtube iFrame
		</p>

<pre>
&lt;iframe width="1280" height="600" src="https://www.youtube.com/embed/<span class="emphasis">uxfuuvjT1OY</span>" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;
</pre>

		<p class="emphasis">
			Vimeo Video
		</p>

<pre>
&lt;div class="video-frame" <span class="emphasis">data-video-id="122325664" data-video-service="vimeo"</span>&gt;&lt;/div&gt;
</pre>

		<p class="emphasis">
			Vimeo iFrame
		</p>

<pre>
&lt;iframe src="//player.vimeo.com/video/<span class="emphasis">47911018</span>" frameborder="0" allowfullscreen&gt;&lt;/iframe&gt;
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
			<strong>Demo:</strong>
		</p>

		<div class="font-control">
			<button class="font-down">A&minus;</button>
			<button class="font-reset primary">A</button>
			<button class="font-up">A+</button>
		</div>


		<dl>
			<dt>
				<strong>Defaults:</strong>
			</dt>
			<dd>
				<code>range: 3</code>
			</dd>
		</dl>


		<p>
			<strong>Code example:</strong>
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