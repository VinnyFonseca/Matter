<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>



<!-- Content -->

<div class="main">
	<div class="intro">
		<div class="wrapper">
			<p class="lead">
				<strong class="font-xlarge">Matter</strong> is a <strong>SASS</strong> and <strong>Compass</strong> front-end framework designed to make HTML work <strong>for</strong> you, not <strong>against</strong> you.
			</p>

			<p>No more de-styling and restyling. Use the HTML elements' default behaviour to leverage your web application and improve your workflow.</p>
		</div>
	</div>

	<div class="wrapper">
		<h2>What's <sub><small class="light-gray">the</small></sub> Matter?</h2>

		<p>
			Matter is the result of <strong>years</strong> of problem solving and bug fixing.
		</p>

		<p>
			It was built over <strong>many iterations</strong>, <strong>cleanups</strong>, <strong>revisions</strong> and <strong>upgrades</strong>, instead of a single sprint from the ground up. This process makes Matter <strong>stable</strong>, <strong>tested</strong>, and with <strong>fewer bugs</strong>.
		</p>

		<p>
			Core files are located at <code>styles/pre/matter/</code> and <code>scripts/matter/</code>. Modify them <strong>at your own risk</strong>.
		</p>


		<hr>


		<a href="#" class="anchor" id="get-started"></a>

		<h2>Get Started</h2>

		<h4>1. Requirements</h4>

		<ol>
			<li>
				<a href="http://rubyinstaller.org/" target="_blank" class="explicit">Ruby</a>
			</li>
			<li>
				<a href="http://sass-lang.com/" target="_blank" class="explicit">Sass</a> <code>gem install sass</code>
			</li>
			<li>
				<a href="http://compass-style.org/" target="_blank" class="explicit">Compass</a> <code>gem install compass</code>
			</li>
		</ol>

		<strong>&minus;&nbsp;&nbsp;and&nbsp;&nbsp;&minus;</strong>

		<ol>
			<li>
				<a href="http://nodejs.org/" target="_blank" class="explicit">Node</a>
			</li>
			<li>
				<a href="http://sass-lang.com/" target="_blank" class="explicit">Grunt</a> <code>npm install -g grunt</code>
			</li>
			<li>
				<a href="http://compass-style.org/" target="_blank" class="explicit">Grunt Command Line Interface (CLI)</a> <code>npm install -g grunt-cli</code>
			</li>
		</ol>


		<hr>


		<h4>2. Download</h4>

		<p>
			<strong>Clone it on</strong> <a href="https://github.com/VinnyFonseca/matter.git" target="_blank">Github</a>.
		</p>

		<strong>&minus;&nbsp;&nbsp;or&nbsp;&nbsp;&minus;</strong>

		<p>
			<a href="download/matter-v0.9.7z" class="button primary">Download Matter <small>(.7z)</small></a>

			<br>

			<small>Requires <a href="http://www.7-zip.org/" target="_blank">7-Zip</a></small>
		</p>


		<hr>


		<h4>3. Start Sass Watch</h4>

		<dl>
			<dt>Windows:</dt>
			<dd>Go to <code>styles/</code> and double click <code>watch.bat</code></dd>

			<dt>Mac OS:</dt>
			<dd>Open a terminal window, navigate to <code>styles/</code></dd>
			<dd><strong>First use only:</strong> <code>sudo chmod ugo+x watch.command</code></dd>
			<dd>Run <code>sh watch</code> or go to <code>styles/</code> and double-click <code>watch.command</code></dd>

			<dt>Linux:</dt>
			<dd>Open a terminal window, navigate to <code>styles/</code></dd>
			<dd><strong>First use only:</strong> <code>sudo chmod ugo+x watch.run</code></dd>
			<dd>Run <code>sudo sh watch.run</code></dd>
		</dl>


		<hr>


		<h4>Done!</h4>

		<p>
			Every <code>.scss</code> file that is not a partial and is inside <code>styles/pre/</code> will compile to new <code>.css</code> and <code>.css.map</code> files inside <code>styles/</code>. <em>Get to da code!</em>
		</p>
	</div>
</div>



<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>