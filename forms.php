<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main">
	<div class="wrapper">

		<a href="#" class="anchor" id="forms"></a>

		<h2>Forms &amp; Form Elements</h2>


		<p class="emphasis">Note: This section is currently under heavy development.</p>

		<ul>
			<li>
				<a href="#input">Input Types</a>
			</li>
			<li>
				<a href="#select">Select</a>
			</li>
			<li>
				<a href="#textarea">Textarea</a>
			</li>
			<li>
				<a href="#fieldset">Fieldset, Checkboxes, Radio Buttons &amp; Toggles</a>
			</li>
			<li>
				<a href="#file">File Upload</a>
			</li>
			<li>
				<a href="#buttons">Buttons</a>
			</li>
		</ul>


		<hr>


		<form novalidate action="#">
			<input type="hidden" name="hidden field" value="42">

			<a href="#" class="anchor" id="input"></a>

			<h3>Input Types</h3>

			<p class="emphasis">
				Note: Validation is active for the fields below. You can change it on <code>config.js</code> under <code>config.forms.validation</code>.
			</p>

			<label>Text</label>
			<input type="text" name="text" placeholder="First and Last Name" data-validation="text" required>

			<label>Number</label>
			<input type="text" name="text" placeholder="Numbers only" data-validation="number" required>

			<label>Email</label>
			<input type="email" name="email" placeholder="name@domain.com" data-validation="email" required>

			<label>Date</label>
			<input type="text" placeholder="dd/mm/yyyy" data-calendar="true" data-validation="date" required>

			<label>Password</label>
			<div class="password-wrapper">
				<input type="password" name="password" placeholder="No minimum, must be strong" data-validation="password" required>
				<div class="password-meter-mask">
					<div class="password-meter"></div>
				</div>
			</div>

			<label>Password Matching</label>
			<div class="input-group block-reset">
				<div class="password-wrapper">
					<input type="password" name="password-match" placeholder="Minimum rating: 30%" data-validation="password" required>
					<div class="password-meter-mask">
						<div class="password-meter"></div>
					</div>
				</div>
				<div class="input-addon">repeat</div>
				<input type="password" name="password-match" placeholder="Repeat password" data-validation="password-match" required>
			</div>


			<br>


			<h5>States</h5>

			<label>Valid</label>
			<input type="text" name="text" placeholder="Valid input" class="valid" required>

			<label>Invalid</label>
			<input type="text" name="text" placeholder="Invalid input" class="invalid" required>

			<label>Disabled</label>
			<input type="text" name="text" placeholder="Disabled input" disabled>

			<label>Tooltip</label>
			<input type="text" name="text" placeholder="Tooltip input" class="tooltip" data-tooltip="Explanation here">


			<br>


			<h5>Date</h5>

			<p>
				<strong>Credit:</strong> <a href="https://bootstrap-datepicker.readthedocs.org/en/release/" target="_blank">Bootstrap Datepicker</a>.
			</p>

<pre>
&lt;input type="text" placeholder="dd/mm/yyyy" <span class="emphasis">data-calendar="true"</span>&gt;
</pre>

			<label>Calendar input</label>
			<input type="text" placeholder="dd/mm/yyyy" data-calendar="true">


<pre>
&lt;div class="input-group <span class="emphasis">input-daterange</span>"&gt;
	&lt;input type="text" placeholder="Start date (dd/mm/yyyy)"&gt;
	&lt;div class="input-addon"&gt;to&lt;/div&gt;
	&lt;input type="text" placeholder="End date (dd/mm/yyyy)"&gt;
&lt;/div&gt;
</pre>

			<label>Date range calendar input</label>
			<div class="input-group input-daterange">
				<input type="text" placeholder="Start date (dd/mm/yyyy)">
				<div class="input-addon">to</div>
				<input type="text" placeholder="End date (dd/mm/yyyy)">
			</div>



			<hr>



			<a href="#" class="anchor" id="select"></a>

			<h3>Select</h3>

<pre>
&lt;select name="select1"&gt;&lt;/select&gt;
</pre>

			<select name="select1">
				<option class="placeholder">Please select...</option>
				<option>one</option>
				<option>two (default)</option>
				<option>three</option>
				<option>four</option>
				<option>five</option>
				<option>six</option>
				<option>seven</option>
				<option>eight</option>
				<option>nine</option>
				<option>ten</option>
			</select>

<pre>
&lt;select name="select1" <span class="emphasis">size="1"</span>&gt;&lt;/select&gt;
</pre>

			<select name="select2" size="1">
				<option class="placeholder">Please select...</option>
				<option>one</option>
				<option selected="">two (default)</option>
				<option>three</option>
				<option>four</option>
				<option>five</option>
				<option>six</option>
				<option>seven</option>
				<option>eight</option>
				<option>nine</option>
				<option>ten</option>
			</select>

<pre>
&lt;select name="select1" <span class="emphasis">size="5"</span>&gt;&lt;/select&gt;
</pre>

			<select name="select3" size="5">
				<option class="placeholder">Please select...</option>
				<option>one</option>
				<option selected="">two (default)</option>
				<option>three</option>
				<option>four</option>
				<option>five</option>
				<option>six</option>
				<option>seven</option>
				<option>eight</option>
				<option>nine</option>
				<option>ten</option>
			</select>



			<hr>



			<a href="#" class="anchor" id="textarea"></a>

			<h3>Textarea</h3>

			<label>Multi-line text input field (textarea):</label>
			<textarea name="textarea" rows="2" cols="20" placeholder="Default text"></textarea>



			<hr>



			<a href="#" class="anchor" id="fieldset"></a>

			<h3>Fieldsets, Checkboxes, Radio Buttons &amp; Toggles</h3>

			<p>They are styled with CSS3 <code>:before</code> pseudo elements. They are wrapped in a <code>.controller.<var>input type</var></code>.</p>

			<h5>Checkboxes</h5>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Checkboxes Group&lt;/legend&gt;

	&lt;div class="controller <span class="emphasis">checkbox</span>"&gt;
		&lt;input id="f3" type="checkbox" name="checkbox"&gt;
		&lt;label for="f3" class="control"&gt;Checkbox 1&lt;/label&gt;
	&lt;/div&gt;
&lt;/fieldset&gt;
</pre>

			<fieldset>
				<legend>Checkboxes Group</legend>

				<div class="controller checkbox">
					<input id="f3" type="checkbox" name="checkbox">
					<label for="f3" class="control">Checkbox 1</label>
				</div>

				<div class="controller checkbox">
					<input id="f4" type="checkbox" name="checkbox2" checked="">
					<label for="f4" class="control">Checkbox Checked</label>
				</div>
			</fieldset>

			<h5>Radio Buttons</h5>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Radio Buttons Group&lt;/legend&gt;

	&lt;div class="controller <span class="emphasis">radio</span>"&gt;
		&lt;input id="f1" type="radio" name="radio" value="1"&gt;
		&lt;label for="f1" class="control"&gt;Radio button 1&lt;/label&gt;
	&lt;/div&gt;
&lt;/fieldset&gt;
</pre>

			<fieldset>
				<legend>Radio Buttons Group</legend>

				<div class="controller radio">
					<input id="f1" type="radio" name="radio" value="1">
					<label for="f1" class="control">Radio button 1</label>
				</div>

				<div class="controller radio">
					<input id="f2" type="radio" name="radio" value="2" checked="">
					<label for="f2" class="control">Radio button Checked</label>
				</div>
			</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Toggles Group&lt;/legend&gt;

	&lt;div class="controller <span class="emphasis">toggle</span>"&gt;
		&lt;input id="f5" type="checkbox" /&gt;
		&lt;label for="f5"&gt;
			&lt;span class="toggle-body"&gt;
				&lt;span class="toggle-switch"&gt;&lt;/span&gt;
				&lt;span class="toggle-track"&gt;
				&lt;span class="toggle-background"&gt;&lt;/span&gt;
					&lt;span class="toggle-background toggle-background-negative"&gt;&lt;/span&gt;
				&lt;/span&gt;
			&lt;/span&gt;

			Toggle 1
		&lt;/label&gt;
	&lt;/div&gt;
&lt;/fieldset&gt;
</pre>

			<fieldset>
				<legend>Toggles Group</legend>

				<div class="controller toggle">
					<input id="f5" type="checkbox" />
					<label for="f5">
						<span class="toggle-body">
							<span class="toggle-switch"></span>
							<span class="toggle-track">
							<span class="toggle-background"></span>
								<span class="toggle-background toggle-background-negative"></span>
							</span>
						</span>

						Toggle 1
					</label>
				</div>

				<div class="controller toggle">
					<input id="f6" type="checkbox" checked="" />
					<label for="f6">
						<span class="toggle-body">
							<span class="toggle-switch"></span>
							<span class="toggle-track">
							<span class="toggle-background"></span>
								<span class="toggle-background toggle-background-negative"></span>
							</span>
						</span>

						Toggle Checked
					</label>
				</div>
				<small>Credit: <a href="http://petelada.com/2015/01/31/css-only-toggle.html" class="explicit">Pete Lada</a></small>
			</fieldset>



			<hr>



			<a href="#" class="anchor" id="file"></a>

			<h3>File Upload</h3>

			<br>

			<h5>Single Upload</h5>

			<p class="emphasis mobile-show">Multiple file upload is not available in the mobile version. Please access the desktop version.</p>

			<div class="file-wrapper mobile-hide">
				<input type="file" />

				<div class="fakefile">
					<div class="button primary fake-upload">Choose File</div>
					<div class="file-result">No file chosen</div>
				</div>
			</div>


			<br>

			<h5>Multiple Upload</h5>

			<p class="emphasis mobile-show">Multiple file upload is not available in the mobile version. Please access the desktop version.</p>

			<div class="multifile-info form-info">You've got <strong class="emphasis font-expanded multi-limit">0</strong> remaining upload<span class="plural">s</span>.</div>

			<div class="multifile-wrapper mobile-hide last">
				<input type="file" />

				<div class="fakefile">
					<div class="button primary fake-upload">Choose File</div>
					<div class="file-result">No file chosen</div>
					<div class="button primary fake-close">&times;</div>
				</div>
			</div>



			<hr>



			<a href="#" class="anchor" id="buttons"></a>

			<h3>Buttons</h3>

			<button class="primary" type="submit">Validate and Send</button>
			<button disabled>Disabled</button>
			<button type="reset">Reset</button>
		</form>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>