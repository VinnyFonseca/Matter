<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">
	<div class="wrapper">

		<div class="sidebar">
			<div class="sidebar-trigger"></div>

			<h3>Grid</h3>

			<ul>
				<li>
					<a class="active" href="#grid-system">Grid System</a>
				</li>
				<li>
					<a href="#complete">Complete Grid</a>
				</li>
			</ul>
		</div>


		<a href="#" class="anchor" id="grid-system"></a>

		<h2>Grid System</h2>

		<p>
			Set the number of columns on <code>_config.scss</code>, then use <code>data-span</code> attribute to set the width of a column. Example:
		</p>

<pre>
&lt;div class="row"&gt;
	&lt;div class="column" data-span="4"&gt;
		&lt;div class="cell"&gt;Test&lt;/div&gt;
	&lt;/div&gt;
	&lt;div class="column" data-span="8"&gt;
		&lt;div class="cell"&gt;Test&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>

		<div class="row debug">
			<div class="column" data-span="4">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="8">
				<div class="cell">Test</div>
			</div>
		</div>

		<p class="emphasis">
			Note: In order to keep cross-browser consistency, <code>.column</code> must be inside a <code>.row</code>.
			<br>
			<code>.cell</code> is optional.
		</p>


		<hr>


		<a href="#" class="anchor" id="complete"></a>

		<h2>Complete Grid</h2>

		<div class="row debug">
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="3">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="4">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="4">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="4">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="5">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="5">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="6">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="6">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="7">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="5">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="8">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="4">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="9">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="10">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="11">
				<div class="cell">Test</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Test</div>
			</div>
		</div>

		<div class="row debug">
			<div class="column" data-span="12">
				<div class="cell">Test</div>
			</div>
		</div>

		<br>

		<p>
			For mobiles, all columns become 100% width.
		</p>

		<p>
			If a column has no <code>data-span</code> declared, it will automatically set to maximum width.
		</p>

<pre>
&lt;div class="row"&gt;
	&lt;div class="column"&gt;
		&lt;div class="cell"&gt;Test&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>

		<div class="row debug">
			<div class="column">
				<div class="cell">Test</div>
			</div>
		</div>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>