<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">

	<div class="sidebar">
		<div class="sidebar-trigger"></div>
		<h3>Grid</h3>
	</div>


	<div class="wrapper">

		<a href="#" class="anchor" id="grid-system"></a>

		<h2>Grid System</h2>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Set the number of columns on <code>_config.scss</code>, then use <code>data-span</code> attribute to set the width of a column. Example:
		</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="row debug">
			<div class="column" data-span="4">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="8">
				<div class="cell">Word</div>
			</div>
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="row"&gt;
	&lt;div class="column" <span class="emphasis">data-span="4"</span>&gt;
		&lt;div class="cell"&gt;Word&lt;/div&gt;
	&lt;/div&gt;
	&lt;div class="column" <span class="emphasis">data-span="8"</span>&gt;
		&lt;div class="cell"&gt;Word&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>

		<p class="emphasis">
			Note: In order to keep cross-browser consistency, <code>.column</code> must be inside a <code>.row</code>. <code>.cell</code> is optional.
			<br>
			If a column has no <code>data-span</code> declared, it will automatically set to maximum width.
		</p>


		<hr>


		<a href="#" class="anchor" id="complete"></a>

		<h2>Complete Grid</h2>

		<div class="row debug">
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="3">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="4">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="4">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="4">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="5">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="5">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="6">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="6">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="7">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="5">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="8">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="4">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="9">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="3">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="10">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="11">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="1">
				<div class="cell">Word</div>
			</div>


			<div class="column" data-span="12">
				<div class="cell">Word</div>
			</div>
		</div>


		<hr>


		<a href="#" class="anchor" id="push"></a>

		<h2>Push Grid</h2>

		<div class="row debug show-push">
			<div class="column" data-span="1" data-push="11">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="2" data-push="10">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="3" data-push="9">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="4" data-push="8">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="5" data-push="7">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="6" data-push="6">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="7" data-push="5">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="8" data-push="4">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="9" data-push="3">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="10" data-push="2">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="11" data-push="1">
				<div class="cell">Word</div>
			</div>
			<div class="column" data-span="12" data-push="0">
				<div class="cell">Word</div>
			</div>
		</div>
	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>