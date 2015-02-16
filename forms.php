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
				<a href="#fieldset">Fieldset, Radio Buttons, Checkboxes &amp; Toggles</a>
			</li>
			<li>
				<a href="#select">Select</a>
			</li>
			<li>
				<a href="#textarea">Textarea</a>
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

			<h3>Input Types <small>(with validation)</small></h3>

			<label>Text</label>
			<input type="text" name="text" placeholder="Text input" data-validation="text" required>

			<label>Email</label>
			<input type="email" name="email" placeholder="name@domain.com" data-validation="email" required>

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
					<input type="password" name="password-match" placeholder="No minimum, must be strong" data-validation="password" required>
					<div class="password-meter-mask">
						<div class="password-meter"></div>
					</div>
				</div>
				<div class="input-addon">repeat</div>
				<input type="password" name="password-match" placeholder="Repeat password" data-validation="password-match" required>
			</div>

			<label>Date input w/ Calendar</label>
			<input type="text" placeholder="dd/mm/yyyy" data-calendar="true" data-validation="date" required>


			<br>

			<h4>States</h4>

			<label>Valid</label>
			<input type="text" name="text" placeholder="Valid input" class="valid" required>

			<label>Invalid</label>
			<input type="text" name="text" placeholder="Invalid input" class="invalid" required>

			<label>Disabled</label>
			<input type="text" name="text" placeholder="Disabled input" disabled>

			<label>Tooltip</label>
			<input type="text" name="text" placeholder="Tooltip input" class="tooltip" data-tooltip="Explanation here">


			<br>

			<h4>Autocompletion Engine</h4>

			<p class="emphasis">
				Note: You can instantiate multiple autocomplete fields.
			</p>

			<label>Autocomplete input 1</label>
			<div class="autocomplete-wrapper" data-url="scripts/dev/autocomplete/sample.json">
				<input type="text" class="autocomplete-input" placeholder="Type to search...">
			</div>

			<label>Autocomplete input 2</label>
			<div class="autocomplete-wrapper" data-url="scripts/dev/autocomplete/sample.json">
				<input type="text" class="autocomplete-input" placeholder="Type to search...">
			</div>


			<br>

			<h4>Date</h4>

			<p class="emphasis">
				Note: Simply add attribute <code>data-calendar="true"</code> to the input to enable the calendar.
			</p>

			<label>Calendar input</label>
			<input type="text" placeholder="dd/mm/yyyy" data-calendar="true">

			<label>Date range calendar input</label>
			<div class="input-group input-daterange">
				<input type="text" placeholder="Start date (dd/mm/yyyy)" data-calendar="true">
				<div class="input-addon">to</div>
				<input type="text" placeholder="End date (dd/mm/yyyy)" data-calendar="true">
			</div>


			<hr>


			<a href="#" class="anchor" id="fieldset"></a>

			<h3>Fieldsets, Radio Buttons, Checkboxes &amp; Toggles</h3>

			<p>The following input pairs are inside a <code>fieldset</code> element with a <code>legend</code>.</p>

			<p>They are styled with CSS3 <code>:before</code> pseudo elements. They are wrapped in a <code>.controller.<var>input type</var></code>.</p>

			<p>ie. <code>.controller.radio</code>, <code>.controller.checkbox</code> or <code>.controller.toggle</code> as below.</p>

			<br>

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


			<a href="#" class="anchor" id="select"></a>

			<h3>Select</h3>

			<p class="emphasis">Note: The <code>select</code> elements below require <code>scripts/forms.js</code> to activate the custom styling.</p>

			<label>A <code>select</code> element with no <code>size</code> attribute becomes a dropdown:</label>
			<select name="select1">
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

			<label>A <code>select</code> element with a <code>size="1"</code> attribute becomes a dropdown:</label>
			<select name="select1" size="1">
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

			<label>A <code>select</code> element with a <code>size="2"</code> or greater becomes a listbox:</label>
			<select name="select2" size="5">
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


			<a href="#" class="anchor" id="file"></a>

			<h3>File Upload</h3>

			<br>

			<h4>Single Upload</h4>

			<p class="mobile-show">Multiple file upload is not available in the mobile version. Please access the desktop version.</p>

			<div class="file-wrapper mobile-hide">
				<input type="file" />

				<div class="fakefile">
					<div class="button primary fake-upload">Choose File</div>
					<div class="file-result">No file chosen</div>
				</div>
			</div>


			<br>

			<h4>Multiple Upload</h4>

			<p class="mobile-show">Multiple file upload is not available in the mobile version. Please access the desktop version.</p>

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