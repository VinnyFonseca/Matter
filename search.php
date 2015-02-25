<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">
	<div class="wrapper">

		<div class="sidebar">
			<div class="sidebar-trigger"></div>
			<h3>Search Engine</h3>
		</div>



		<a href="#" class="anchor" id="search"></a>

		<h2>Unified Search</h2>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Apply <code>data-search="<var>PATH-TO-JSON.json</var>"</code> to a <strong>parent</strong> of a group of <code>input</code> or <code>select</code> elements. This will create a tag cloud after it, group all elements' outputs and build an array for analysis. You can then use the array to rebuild the search results.
		</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<div data-search="scripts/dev/data/search.json">
			<!-- <div class="autocomplete-wrapper" data-autocomplete="scripts/dev/data/search.json"> -->
				<input type="text" placeholder="Search..." data-search-subject="Title, Summary" data-autocomplete-subject="Title">
			<!-- </div> -->

			<div class="row">
				<div class="column" data-span="4">
					<select data-search-subject="Categories"></select>
				</div>
				<div class="column" data-span="4">
					<select data-search-subject="Tags"></select>
				</div>
				<div class="column" data-span="4">
					<select data-search-subject="Type"></select>
				</div>
			</div>
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>

</pre>



		<hr>



		<a href="#" class="anchor" id="autocomplete"></a>

		<h2>Autocompletion</h2>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Insert the example code below anywhere in your page, then define the URL for each autocomplete input on <code>data-autocomplete</code>. You can instantiate multiple autocomplete fields with different target URLs.
		</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<div class="autocomplete-wrapper" data-autocomplete="scripts/dev/data/search.json">
			<input type="text" placeholder="Type to search..." data-autocomplete-subject="Title">
		</div>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;div class="autocomplete-wrapper" <span class="emphasis">data-autocomplete="scripts/dev/data/autocomplete.json"</span>&gt;
	&lt;input type="text" placeholder="Type to search..." <span class="emphasis">data-autocomplete-subject="Title"</span>&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="tagcloud"></a>

		<h2>Tag Cloud</h2>

		<p>
			<strong>Usage:</strong>
		</p>

		<p>
			Apply <code>data-tagcloud="true"</code> to an <code>input</code> or <code>select</code> element.
		</p>

		<p>
			<strong>Demo:</strong>
		</p>

		<input type="text" placeholder="Type and press Enter to add to the tag cloud" data-tagcloud="true">

		<select data-tagcloud="true">
			<option class="placeholder">Please select any option to add to the tag cloud</option>
			<option>one</option>
			<option>two</option>
			<option>three</option>
			<option>four</option>
			<option>five</option>
			<option>six</option>
			<option>seven</option>
			<option>eight</option>
			<option>nine</option>
			<option>ten</option>
		</select>

		<p>
			<strong>Example:</strong>
		</p>

<pre>
&lt;input type="text" placeholder="Type and press Enter to add to the tag cloud" <span class="emphasis">data-tagcloud="true"</span>&gt;
&lt;select <span class="emphasis">data-tagcloud="true"</span>&gt;&lt;/select&gt;
</pre>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>