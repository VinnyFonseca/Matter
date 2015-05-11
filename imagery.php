<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">

	<div class="sidebar">
		<div class="sidebar-trigger"></div>
		<h3>Imagery</h3>
	</div>


	<div class="wrapper">

		<a href="#" class="anchor" id="img"></a>

		<h2>The <code>img</code> element</h2>

		<p>
			Width and height are set by CSS. Omit it to preserve ratio. Set it only as a conditional style for IE8, otherwise the image loses proportion.
		</p>

		<img src="http://placehold.it/1280x720" alt="Placeholder Image." />

<pre>
&lt;img src="http://placehold.it/1280x720" alt="Placeholder Image."&gt;
</pre>


		<hr>


		<a href="#" class="anchor" id="srcset"></a>

		<h2>The <code>srcset</code> attribute</h2>

		<p>
			Recommended over <code>picture</code> for responsive image use.
		</p>

		<p class="emphasis">Note: Resize the browser to see the image source change on the fly.</p>

		<blockquote>
			<p>
				The difference is that, in <code>picture</code> when you have a list of sources, the browser MUST use the first source that has a rule that matches.
			</p>

			<p>
				With <code>img srcset</code>, the browser can pick what it thinks is best. It allows things like downloading one source and then downloading a higher resolution version when the person zooms. The browser can pick the best source instead of having it dictated to it.
			</p>

			<cite>Jason Grigsby, <a href="http://blog.cloudfour.com/dont-use-picture-most-of-the-time/">Don’t use &lt;picture&gt; (most of the time)</a>.</cite>
		</blockquote>

		<img src="http://placehold.it/1280x720"
			 sizes="(min-width: 40em) 80vw, 100vw"
			 srcset="http://placehold.it/800x480 480w,
					 http://placehold.it/1024x600 768w,
					 http://placehold.it/1280x720 960w"
			 alt="Placeholder Image." />

<pre>
&lt;img src="http://placehold.it/1280x720"
	 sizes="(min-width: 40em) 80vw, 100vw"
	 srcset="http://placehold.it/800x480 480w,
	     http://placehold.it/1024x600 480w 2x,
	     http://placehold.it/1024x600 768w,
	     http://placehold.it/1280x720 768w 2x,
	     http://placehold.it/1280x720 960w"
	 alt="Placeholder Image."&gt;
</pre>


		<hr>


		<a href="#" class="anchor" id="picture"></a>

		<h2>The <code>picture</code> element</h2>

		<p>
			Recommended over <code>srcset</code> for art direction purposes. <code>Picture</code> uses the first source that has a rule that matches.
		</p>

		<p class="emphasis">Note: Resize the browser to see the image source change on the fly.</p>

		<picture>
			<!-- IE Fix, video element wrapper -->
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="http://placehold.it/1920x1080" media="(min-width: 1280px)">
			<source srcset="http://placehold.it/1280x720" media="(min-width: 960px)">
			<source srcset="http://placehold.it/1024x600" media="(min-width: 768px)">
			<source srcset="http://placehold.it/800x480" media="(min-width: 480px)">
			<source srcset="http://placehold.it/640x380" media="(min-width: 320px)">
			<!--[if IE 9]></video><![endif]-->

			<!-- Fallback -->
			<img src="http://placehold.it/1920x1080" alt="Placeholder Image.">
		</picture>

<pre>
&lt;picture&gt;
	&lt;!-- IE Fix, video element wrapper --&gt;
	&lt;!--[if IE 9]&gt;&lt;video style="display: none;"&gt;&lt;![endif]--&gt;
	&lt;source srcset="http://placehold.it/1920x1080" media="(min-width: 1280px)"&gt;
	&lt;source srcset="http://placehold.it/1280x720" media="(min-width: 960px)"&gt;
	&lt;source srcset="http://placehold.it/1024x600" media="(min-width: 768px)"&gt;
	&lt;source srcset="http://placehold.it/800x480" media="(min-width: 480px)"&gt;
	&lt;source srcset="http://placehold.it/640x380" media="(min-width: 320px)"&gt;
	&lt;!--[if IE 9]&gt;&lt;/video&gt;&lt;![endif]--&gt;

	&lt;!-- Fallback --&gt;
	&lt;img src="http://placehold.it/1920x1080" alt="Placeholder Image."&gt;
&lt;/picture>
</pre>

		<br>

		<p>
			Reversing the order, though, causes the first source that matches the rule to load. As the browser is indeed wider than 320px, the smallest image loads.
		</p>

		<picture>
			<!-- IE Fix, video element wrapper -->
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="http://placehold.it/640x380" media="(min-width: 320px)">
			<source srcset="http://placehold.it/800x480" media="(min-width: 480px)">
			<source srcset="http://placehold.it/1024x600" media="(min-width: 768px)">
			<source srcset="http://placehold.it/1280x720" media="(min-width: 960px)">
			<source srcset="http://placehold.it/1920x1080" media="(min-width: 1280px)">
			<!--[if IE 9]></video><![endif]-->

			<!-- Fallback -->
			<img src="http://placehold.it/1920x1080" alt="Placeholder Image.">
		</picture>

<pre>
&lt;picture&gt;
	&lt;!-- IE Fix, video element wrapper --&gt;
	&lt;!--[if IE 9]&gt;&lt;video style="display: none;"&gt;&lt;![endif]--&gt;
	&lt;source srcset="http://placehold.it/640x380" media="(min-width: 320px)"&gt;
	&lt;source srcset="http://placehold.it/800x480" media="(min-width: 480px)"&gt;
	&lt;source srcset="http://placehold.it/1024x600" media="(min-width: 768px)"&gt;
	&lt;source srcset="http://placehold.it/1280x720" media="(min-width: 960px)"&gt;
	&lt;source srcset="http://placehold.it/1920x1080" media="(min-width: 1280px)"&gt;
	&lt;!--[if IE 9]&gt;&lt;/video&gt;&lt;![endif]--&gt;

	&lt;!-- Fallback --&gt;
	&lt;img src="http://placehold.it/1920x1080" alt="Placeholder Image."&gt;
&lt;/picture>
</pre>

		<p>
			So, the solution that Matter uses is to mimic the same media queries we have on the framework, which covers the vast majority of design cases.
		</p>

		<br>

		<p>
			Change <code>min-width</code> to <code>max-width</code> queries and reverse the order of the queries to cater for a mobile-first approach.
		</p>

		<picture>
			<!-- IE Fix, video element wrapper -->
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="http://placehold.it/640x380" media="(max-width: 480px)">
			<source srcset="http://placehold.it/800x480" media="(max-width: 768px)">
			<source srcset="http://placehold.it/1024x600" media="(max-width: 960px)">
			<source srcset="http://placehold.it/1280x720" media="(max-width: 1280px)">
			<source srcset="http://placehold.it/1920x1080" media="(min-width: 1281px)">
			<!--[if IE 9]></video><![endif]-->

			<!-- Fallback -->
			<img src="http://placehold.it/1920x1080" alt="Placeholder Image.">
		</picture>

<pre>
&lt;picture&gt;
	&lt;!-- IE Fix, video element wrapper --&gt;
	&lt;!--[if IE 9]&gt;&lt;video style="display: none;"&gt;&lt;![endif]--&gt;
	&lt;source srcset="http://placehold.it/640x380" media="(max-width: 480px)"&gt;
	&lt;source srcset="http://placehold.it/800x480" media="(max-width: 768px)"&gt;
	&lt;source srcset="http://placehold.it/1024x600" media="(max-width: 960px)"&gt;
	&lt;source srcset="http://placehold.it/1280x720" media="(max-width: 1280px)"&gt;
	&lt;source srcset="http://placehold.it/1920x1080" media="(min-width: 1281px)"&gt;
	&lt;!--[if IE 9]&gt;&lt;/video&gt;&lt;![endif]--&gt;

	&lt;!-- Fallback --&gt;
	&lt;img src="http://placehold.it/1920x1080" alt="Placeholder Image."&gt;
&lt;/picture>
</pre>

		<br>

		<p>
			A rule of thumb would be to provide 1.5x bigger images for the maximum width of the respective query:
		</p>

		<ul>
			<li><code>max-width: 480px</code> - 720px</li>
			<li><code>max-width: 768px</code> - 1152px</li>
			<li><code>max-width: 960px</code> - 1440px</li>
			<li><code>min-width: 961px</code> - 1920px (Full HD, wide enough for big screens)</li>
		</ul>

		<p>
			Or, to make things simpler, instead of calculating these values every time, just turn it up a notch to the next most common resolution:
		</p>

		<ul>
			<li><code>max-width: 480px</code> - 640px</li>
			<li><code>max-width: 768px</code> - 1024px</li>
			<li><code>max-width: 960px</code> - 1280px</li>
			<li><code>min-width: 961px</code> - 1920px (Full HD, wide enough for big screens)</li>
		</ul>

		<p>
			This is a reasonable compromise between quality, size (in bytes) and screens sizes. It's also easily remembered and still much better than <code>img</code> alone.
		</p>


		<hr>


		<a href="#" class="anchor" id="thoughts"></a>

		<h2>Final Thoughts</h2>

		<p>
			Although <code>img srcset</code> is recommended, <code>picture</code> seems to be <strong>easier to use</strong>, has a <strong>more understandable syntax</strong> and just needs changing the <strong>order of the sources</strong> if you're using a mobile-first approach. It does not take into consideration screen densities, though if you choose to create slightly bigger assets for the targeted resolutions, 320w devices will load 480w images and so on.
		</p>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>