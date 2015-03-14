<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">
	<div class="wrapper">

		<div class="sidebar">
			<div class="sidebar-trigger"></div>
			<h3>Forms</h3>
		</div>



		<p class="emphasis">Note: This section is currently under heavy development.</p>

		<a href="#" class="anchor" id="input"></a>

		<h2>Complete Form w/ Validation</h2>

		<form action="#" novalidate data-validation="true">
			<input type="hidden" value="42">

			<p class="emphasis">
				Note: You can turn validation on or off at <code>config.js</code>.
			</p>

			<div class="form-info">
				Fields marked with <span class='indicator-required'></span> are required.
			</div>

			<label>Text</label>
			<input type="text" name="text" placeholder="First and Last Name" data-validation="text" required>

			<label>Number</label>
			<input type="number" name="number" placeholder="Numbers only" data-validation="number" required>

			<div class="input-group block-reset">
				<label>Email w/ Confirmation</label>
				<input type="email" name="email" placeholder="Email" data-validation="email" required>
				<div class="input-addon">repeat</div>
				<input type="email" name="email-match" placeholder="Confirm Email" data-validation="match" required>
			</div>

			<label>Date</label>
			<input type="text" name="date" placeholder="dd/mm/yyyy" data-calendar="true" data-validation="date" required>

			<div class="input-group block-reset">
				<label>Password w/ Confirmation</label>
				<input type="password" name="password" placeholder="Minimum rating: 30%" data-validation="password" data-validate-key="true" required>
				<div class="input-addon">repeat</div>
				<input type="password" name="password-match" placeholder="Confirm Password" data-validation="match" required>
			</div>

			<label>Select</label>
			<select name="country" data-validation="select" data-countries="scripts/dev/data/countries.json" required>
				<option value="" default selected>Select country...</option>
			</select>

			<!-- <label>Select List</label>
			<select name="country" data-validation="select" data-countries="scripts/dev/data/countries.json" size="5" required>
				<option value="" default selected>Select country...</option>
			</select> -->

			<label>Textarea</label>
			<textarea name="textarea" rows="5" cols="50" placeholder="Default text" data-validation="text" required></textarea>

			<p class="form-info emphasis">
				Note: Checkboxes need all required options to be selected.
			</p>

			<fieldset>
				<legend>Checkboxes</legend>

				<input id="f5" type="checkbox" name="check-accept" value="1" data-validation="checkbox" required>
				<label for="f5">I accept the following lipsum</label>

				<input id="f6" type="checkbox" name="check-terms" value="2" data-validation="checkbox" required>
				<label for="f6">Terms &amp; lipsum</label>

				<input id="f7" type="checkbox" name="check-subscribe" value="3" data-validation="checkbox" required>
				<label for="f7">Uncheck if you don't want to lipsum</label>
			</fieldset>

			<fieldset>
				<legend>Toggle Checkboxes</legend>

				<input id="f8" type="togglecheckbox" data-validation="checkbox" required>
				<label for="f8">I accept the following lipsum</label>

				<input id="f9" type="togglecheckbox" data-validation="checkbox" required>
				<label for="f9">Terms &amp; lipsum</label>

				<input id="f10" type="togglecheckbox" data-validation="checkbox" required>
				<label for="f10">Check if you don't want to lipsum</label>
			</fieldset>

			<p class="form-info emphasis">
				Note: Radio buttons need one required option to be selected.
			</p>

			<fieldset>
				<legend>Radio Buttons</legend>

				<input id="f1" type="radio" name="option-group" value="1" data-validation="radio" required>
				<label for="f1">Select this to choose the following lipsum</label>

				<input id="f2" type="radio" name="option-group" value="2" data-validation="radio" required>
				<label for="f2">Select this to choose the Terms &amp; lipsum</label>

				<input id="f3" type="radio" name="option-group" value="3" data-validation="radio" required>
				<label for="f3">Select this to choose lipsum</label>
			</fieldset>

			<fieldset>
				<legend>Toggle Radio Buttons</legend>
				<input id="f11" type="toggleradio" name="toggle-group-1" data-validation="radio" required>
				<label for="f11">Select this to choose the following lipsum</label>

				<input id="f12" type="toggleradio" name="toggle-group-1" data-validation="radio" required>
				<label for="f12">Select this to choose the Terms &amp; lipsum</label>

				<input id="f13" type="toggleradio" name="toggle-group-1" data-validation="radio" required>
				<label for="f13">Select this to choose lipsum</label>
			</fieldset>

			<button class="primary" type="submit">Validate and Send</button>
			<img class="form-loader" src="img/loader.gif" height="32" width="32" alt="">
			<img class="svg icon icon-tick form-done" src="img/icons/icon-tick.svg" onerror="this.onerror=null;this.src='img/icons/icon-tick.png'">
		</form>



		<hr>



		<a href="#" class="anchor" id="buttons"></a>

		<h2>Payment Form</h2>

		<form action="#" novalidate data-validation="true">
			<div class="card-wrapper framed">
				<div class="row payment">
					<div class="column" data-span="3">
						<a href="#">
							<img src="img/icons/payment/button-paypal.png" alt="Checkout with PayPal">
						</a>
					</div>
					<div class="column" data-span="3">
						<a href="#">
							<img src="img/icons/payment/button-google.png" alt="Checkout with Google">
						</a>
					</div>
					<div class="column" data-span="3">
						<a href="#">
							<img src="img/icons/payment/button-amazon.png" alt="Checkout with Amazon">
						</a>
					</div>
					<div class="column" data-span="3">
						<a href="#">
							<img src="img/icons/payment/button-card.png" alt="Pay by Card">
						</a>
					</div>
				</div>
			</div>

			<div class="card-wrapper framed">
				<div class="row">
					<div class="column">
						<div class="card-type valign-middle">
							<img class="card" src="img/icons/payment/cards/generic.png">
							<span class="font-medium">Payment Details</span>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="column" data-span="6">
						<label>Name</label>
						<input type="text" name="card-name" placeholder="As shown on card" data-validation="text" required>
					</div>
					<div class="column" data-span="6">
						<label>Card number</label>
						<input type="number" name="card" placeholder="16 digits long number" data-validation="card" data-validate-key="true" required>
					</div>
				</div>

				<div class="row">
					<div class="column" data-span="3">
						<label>Start Date</label>
						<select name="card-expiry-month" data-validation="select">
							<option value="" default selected>Month</option>
							<option value="01">01</option>
							<option value="02">02</option>
							<option value="03">03</option>
							<option value="04">04</option>
							<option value="05">05</option>
							<option value="06">06</option>
							<option value="07">07</option>
							<option value="08">08</option>
							<option value="09">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
					</div>
					<div class="column" data-span="3">
						<select name="card-expiry-year" data-validation="select">
							<option value="" default selected>Year</option>
							<option value="2015">2015</option>
							<option value="2016">2016</option>
							<option value="2017">2017</option>
							<option value="2018">2018</option>
							<option value="2019">2019</option>
							<option value="2020">2020</option>
							<option value="2021">2021</option>
							<option value="2022">2022</option>
							<option value="2023">2023</option>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
						</select>
					</div>
					<div class="column" data-span="3">
						<label>Expiry Date</label>
						<select name="card-expiry-month" data-validation="select" required>
							<option value="" default selected>Month</option>
							<option value="01">01</option>
							<option value="02">02</option>
							<option value="03">03</option>
							<option value="04">04</option>
							<option value="05">05</option>
							<option value="06">06</option>
							<option value="07">07</option>
							<option value="08">08</option>
							<option value="09">09</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
						</select>
					</div>
					<div class="column" data-span="3">
						<select name="card-expiry-year" data-validation="select" required>
							<option value="" default selected>Year</option>
							<option value="2015">2015</option>
							<option value="2016">2016</option>
							<option value="2017">2017</option>
							<option value="2018">2018</option>
							<option value="2019">2019</option>
							<option value="2020">2020</option>
							<option value="2021">2021</option>
							<option value="2022">2022</option>
							<option value="2023">2023</option>
							<option value="2024">2024</option>
							<option value="2025">2025</option>
						</select>
					</div>
				</div>

				<div class="row">
					<div class="column" data-span="3">
						<label>CCV</label>
						<input type="number" name="ccv" placeholder="3 digit security code" data-tooltip="<img src='img/icons/payment/ccv.png'>" data-validation="number" required>
					</div>
					<div class="column" data-span="6">&nbsp;</div>
					<div class="column" data-span="3">
						<button class="primary fullwidth" type="submit">Pay now</button>
					</div>
				</div>
			</div>
		</form>



		<hr>



		<a href="#" class="anchor" id="states"></a>

		<h2>Validation States</h2>

		<table id="validation-table">
			<thead>
				<tr valign="middle">
					<th valign="middle" scope="col">Valid</th>
					<th valign="middle" scope="col">Invalid</th>
					<th valign="middle" scope="col">Readonly/Disabled</th>
				</tr>
			</thead>
			<tbody>
				<tr valign="middle">
					<td valign="middle">
						<input type="text" name="text" placeholder="Input" class="valid" required>
					</td>
					<td valign="middle">
						<input type="text" name="text" placeholder="Input" class="invalid" required>
					</td>
					<td valign="middle">
						<input type="text" name="text" placeholder="Input" readonly>
					</td>
				</tr>
				<tr valign="middle">
					<td valign="middle">
						<select class="valid" name="test" data-validation="select" required>
							<option value="" default selected>Select</option>
							<option value="one">one</option>
							<option value="two">two</option>
							<option value="three">three</option>
							<option value="four">four</option>
							<option value="five">five</option>
							<option value="six">six</option>
							<option value="seven">seven</option>
							<option value="eight">eight</option>
							<option value="nine">nine</option>
							<option value="ten">ten</option>
						</select>
					</td>
					<td valign="middle">
						<select class="invalid" name="test" data-validation="select" required>
							<option value="" default selected>Select</option>
							<option value="one">one</option>
							<option value="two">two</option>
							<option value="three">three</option>
							<option value="four">four</option>
							<option value="five">five</option>
							<option value="six">six</option>
							<option value="seven">seven</option>
							<option value="eight">eight</option>
							<option value="nine">nine</option>
							<option value="ten">ten</option>
						</select>
					</td>
					<td valign="middle">
						<select name="test" data-validation="select" readonly>
							<option value="" default selected>Select</option>
							<option value="one">one</option>
							<option value="two">two</option>
							<option value="three">three</option>
							<option value="four">four</option>
							<option value="five">five</option>
							<option value="six">six</option>
							<option value="seven">seven</option>
							<option value="eight">eight</option>
							<option value="nine">nine</option>
							<option value="ten">ten</option>
						</select>
					</td>
				</tr>
				<tr valign="middle">
					<td valign="middle">
						<textarea class="valid" name="textarea" cols="30" rows="5" required>Textarea</textarea>
					</td>
					<td valign="middle">
						<textarea class="invalid" name="textarea" cols="30" rows="5" required>Textarea</textarea>
					</td>
					<td valign="middle">
						<textarea name="textarea" cols="30" rows="5" readonly>Textarea</textarea>
					</td>
				</tr>
				<tr valign="middle">
					<td valign="middle">
						<input class="valid" id="f200" type="checkbox" name="checkbox" required checked>
						<label for="f200">Checkbox</label>
					</td>
					<td valign="middle">
						<input class="invalid" id="f201" type="checkbox" name="checkbox" required>
						<label for="f201">Checkbox</label>
					</td>
					<td valign="middle">
						<input id="f202" type="checkbox" name="checkbox" readonly>
						<label for="f202">Checkbox</label>
					</td>
				</tr>
				<tr valign="middle">
					<td valign="middle">
						<input class="valid" id="f203" type="togglecheckbox" name="toggle-demo" required checked>
						<label for="f203">Checkbox</label>
					</td>
					<td valign="middle">
						<input class="invalid" id="f204" type="togglecheckbox" name="toggle-demo" required>
						<label for="f204">Checkbox</label>
					</td>
					<td valign="middle">
						<input id="f205" type="togglecheckbox" name="toggle-demo" readonly>
						<label for="f205">Checkbox</label>
					</td>
				</tr>
				<tr valign="middle">
					<td valign="middle">
						<input class="valid" id="f206" type="radio" name="radio-demo" required checked>
						<label for="f206">Radio</label>
					</td>
					<td valign="middle">
						<input class="invalid" id="f207" type="radio" name="radio-demo" required>
						<label for="f207">Radio</label>
					</td>
					<td valign="middle">
						<input id="f208" type="radio" name="radio-demo" readonly>
						<label for="f208">Radio</label>
					</td>
				</tr>
				<tr valign="middle">
					<td valign="middle">
						<input class="valid" id="f209" type="toggleradio" name="toggle-demo" required checked>
						<label for="f209">Radio</label>
					</td>
					<td valign="middle">
						<input class="invalid" id="f210" type="toggleradio" name="toggle-demo" required>
						<label for="f210">Radio</label>
					</td>
					<td valign="middle">
						<input id="f211" type="toggleradio" name="toggle-demo" readonly>
						<label for="f211">Radio</label>
					</td>
				</tr>
			</tbody>
		</table>



		<hr>



		<a href="#" class="anchor" id="select"></a>

		<h2>Select</h2>

		<select>
			<option value="" default selected>Please select...</option>
			<option value="one">one</option>
			<option value="two">two</option>
			<option value="three">three</option>
			<option value="four">four</option>
			<option value="five">five</option>
			<option value="six">six</option>
			<option value="seven">seven</option>
			<option value="eight">eight</option>
			<option value="nine">nine</option>
			<option value="ten">ten</option>
		</select>

<pre>
&lt;select>
	&lt;option <span class="emphasis">value="" default selected</span>&gt;Please select...&lt;/option&gt;
	&lt;option value="one"&gt;one&lt;/option&gt;
	&lt;option value="two"&gt;two&lt;/option&gt;
	&lt;option value="three"&gt;three&lt;/option&gt;
	&lt;option value="four"&gt;four&lt;/option&gt;
	&lt;option value="five"&gt;five&lt;/option&gt;
	&lt;option value="six"&gt;six&lt;/option&gt;
	&lt;option value="seven"&gt;seven&lt;/option&gt;
	&lt;option value="eight"&gt;eight&lt;/option&gt;
	&lt;option value="nine"&gt;nine&lt;/option&gt;
	&lt;option value="ten"&gt;ten&lt;/option&gt;
&lt;/select&gt;
</pre>

		<br>

		<select size="5">
			<option value="" default selected>Please select...</option>
			<option value="one">one</option>
			<option value="two">two</option>
			<option value="three" selected>three</option>
			<option value="four">four</option>
			<option value="five">five</option>
			<option value="six">six</option>
			<option value="seven">seven</option>
			<option value="eight">eight</option>
			<option value="nine">nine</option>
			<option value="ten">ten</option>
		</select>

<pre>
&lt;select <span class="emphasis">size="5"</span>&gt;
	&lt;option <span class="emphasis">value="" default selected</span>&gt;Please select...&lt;/option&gt;
	&lt;option value="one"&gt;one&lt;/option&gt;
	&lt;option value="two"&gt;two&lt;/option&gt;
	&lt;option value="three"&gt;three&lt;/option&gt;
	&lt;option value="four"&gt;four&lt;/option&gt;
	&lt;option value="five"&gt;five&lt;/option&gt;
	&lt;option value="six"&gt;six&lt;/option&gt;
	&lt;option value="seven"&gt;seven&lt;/option&gt;
	&lt;option value="eight"&gt;eight&lt;/option&gt;
	&lt;option value="nine"&gt;nine&lt;/option&gt;
	&lt;option value="ten"&gt;ten&lt;/option&gt;
&lt;/select&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="fieldset"></a>

		<h2>Checkboxes, Radio Buttons &amp; Toggles</h2>

		<p>
			They are styled with CSS3 <code>:before</code> pseudo elements.
		</p>

		<p class="emphasis">
			Note: <code>label</code> element <strong>after</strong> input and <code>for</code> attribute are obligatory.
		</p>

		<h4>Checkboxes</h4>

		<fieldset>
			<legend>Checkboxes Group</legend>

			<input id="f301" type="checkbox" name="checkbox">
			<label for="f301">Checkbox</label>

			<input id="f302" type="checkbox" name="checkbox2" checked>
			<label for="f302">Checkbox Checked</label>
		</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Checkboxes Group&lt;/legend&gt;

	&lt;input <span class="emphasis">id="f101"</span> type="checkbox" name="checkbox"&gt;
	&lt;label <span class="emphasis">for="f101"</span>&gt;Checkbox&lt;/label&gt;
&lt;/fieldset&gt;
</pre>

		<br>

		<h4>Radio Buttons</h4>

		<fieldset>
			<legend>Radio Buttons Group</legend>

			<input id="f303" type="radio" name="radio" value="1">
			<label for="f303">Radio</label>

			<input id="f304" type="radio" name="radio" value="2" checked>
			<label for="f304">Radio Checked</label>
		</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Radio Buttons Group&lt;/legend&gt;

	&lt;input <span class="emphasis">id="f102"</span> type="radio" name="radio" value="1"&gt;
	&lt;label <span class="emphasis">for="f102"</span>&gt;Radio&lt;/label&gt;
&lt;/fieldset&gt;
</pre>

		<br>

		<h4>Toggles</h4>

		<p>
			<strong>Credit:</strong> <a href="http://petelada.com/2015/01/31/css-only-toggle.html">Pete Lada</a>
		</p>

		<fieldset>
			<legend>Toggles Group</legend>

			<input id="f305" type="toggle" />
			<label for="f305">Toggle</label>

			<input id="f306" type="toggle" checked />
			<label for="f306">Toggle Checked</label>
		</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Toggles Group&lt;/legend&gt;

	&lt;input <span class="emphasis">id="f103"</span> type="toggle" /&gt;
	&lt;label <span class="emphasis">for="f103"</span>&gt;Toggle&lt;/label&gt;
&lt;/fieldset&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="datepicker"></a>

		<h2>Datepicker</h2>

		<p>
			<strong>Credit:</strong> <a href="https://bootstrap-datepicker.readthedocs.org/en/release/" target="_blank">Bootstrap Datepicker</a>
		</p>

		<label>Calendar input</label>
		<input type="text" placeholder="dd/mm/yyyy" data-calendar="true">

<pre>
&lt;input type="text" placeholder="dd/mm/yyyy" <span class="emphasis">data-calendar="true"</span>&gt;
</pre>

		<br>

		<label>Date range calendar input</label>
		<div class="input-group input-daterange">
			<input type="text" placeholder="Start date (dd/mm/yyyy)">
			<div class="input-addon">to</div>
			<input type="text" placeholder="End date (dd/mm/yyyy)">
		</div>

<pre>
&lt;div class="input-group <span class="emphasis">input-daterange</span>"&gt;
	&lt;input type="text" placeholder="Start date (dd/mm/yyyy)"&gt;
	&lt;div class="input-addon"&gt;to&lt;/div&gt;
	&lt;input type="text" placeholder="End date (dd/mm/yyyy)"&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="file"></a>

		<h2>File Upload</h2>

		<br>

		<h4>Single Upload</h4>

		<p class="emphasis mobile-show">Multiple file upload is not available in the mobile version. Please access the desktop version.</p>

		<div class="file-wrapper mobile-hide">
			<input type="file" />

			<div class="fakefile">
				<div class="button primary fake-upload">Choose File</div>
				<div class="file-result">No file chosen</div>
			</div>
		</div>


		<br>

		<h4>Multiple Upload</h4>

		<p class="emphasis mobile-show">Multiple file upload is not available in the mobile version. Please access the desktop version.</p>

		<div class="multifile-info form-info">
			You've got <strong class="emphasis font-expanded multi-limit">0</strong>
			remaining upload<span class="plural">s</span>.
		</div>

		<div class="multifile-wrapper mobile-hide last">
			<input type="file" />

			<div class="fakefile">
				<div class="button primary fake-upload">Choose File</div>
				<div class="file-result">No file chosen</div>
				<div class="button primary fake-close">&times;</div>
			</div>
		</div>

<pre>
&lt;div class="multifile-info form-info"&gt;
	You've got &lt;strong class="emphasis font-expanded multi-limit"&gt;0&lt;/strong&gt;
	remaining upload&lt;span class="plural"&gt;s&lt;/span&gt;.
&lt;/div&gt;

&lt;div class="multifile-wrapper mobile-hide last"&gt;
	&lt;input type="file" /&gt;

	&lt;div class="fakefile"&gt;
		&lt;div class="button primary fake-upload"&gt;Choose File&lt;/div&gt;
		&lt;div class="file-result"&gt;No file chosen&lt;/div&gt;
		&lt;div class="button primary fake-close"&gt;&times;&lt;/div&gt;
	&lt;/div&gt;
&lt;/div&gt;
</pre>



		<hr>



		<a href="#" class="anchor" id="progress"></a>

		<h2>Progress Bar</h2>

		<label data-progress="0">Progress Bar</label>
		<progress max="100" value="0">
			<div class="progress-bar">
				<span>0%</span>
			</div>
		</progress>
		<button class="primary" data-progress="100">Trigger Progress</button>
	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>