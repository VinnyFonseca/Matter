<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">
	<div class="wrapper">

		<div class="sidebar">
			<div class="sidebar-trigger"></div>

			<h3>Structure</h3>

			<ul>
				<li>
					<a class="active" href="#directory">Directory Listing</a>
				</li>
				<li>
					<a href="#breakdown">Breakdown</a>
				</li>
			</ul>
		</div>


		<a href="#" class="anchor" id="directory"></a>

		<h2>Directory Listing</h2>

<pre class="structure clean">
<em>+ img</em>
    <span>favicon</span>
    <span>icons</span>
    <span>markers</span>
<em>include</em>
<em>+ scripts</em>
    <span class="emphasis">core</span>
    <span>dev</span>
    <span class="emphasis">vendor</span>
<em>+ styles</em>
    <span class="emphasis">core</span>
    <span>dev</span>
    <span class="emphasis">vendor</span>
</pre>

		<!--
		<br>

		<h2>Root Files</h2>

<pre class="structure clean">
.gitignore
LICENSE
README.md
package.json
Gruntfile.js
index.php
</pre>
-->

		<hr>

		<h2>Breakdown</h2>

		<p class="emphasis">
			Note: Folders marked in red are to be left intact whenever possible. Modifying their files may cause bugs that may not be immediately detectable.
		</p>

		<p>
			<code>img</code> and subfolders - Self explanatory.
		</p>

		<p>
			<code>include</code> - Contains reusable blocks of code. <strong>ie.</strong> head, header, footer and foot.
		</p>

		<p>
			<code>scripts</code> - <code>dev</code> is your work area. Set the variables in <code>config.js</code> and off you go.
		</p>

		<p>
			<code>styles</code> - <code>dev</code> is your work area. Set the variables in <code>config.scss</code> and off you go.
		</p>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>