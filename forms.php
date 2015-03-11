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

		<h2>Input Types</h2>

		<form action="#" novalidate data-validation="true">
			<input type="hidden" value="42">

			<p class="emphasis">
				Note: Validation is active for the fields below. You can change it on <code>config.js</code> under <code>config.forms.validation</code>.
			</p>

			<label>Text</label>
			<input type="text" name="text" placeholder="First and Last Name" data-validation="text" required>

			<label>Number</label>
			<input type="text" name="number" placeholder="Numbers only" data-validation="number" required>

			<div class="input-group block-reset">
				<label>Email w/ Confirmation</label>
				<input type="email" name="email" placeholder="Email" data-validation="email" required>
				<div class="input-addon">repeat</div>
				<input type="email" name="email-match" placeholder="Repeat email" data-validation="match" required>
			</div>

			<label>Date</label>
			<input type="text" name="date" placeholder="dd/mm/yyyy" data-calendar="true" data-validation="date" required>

			<div class="input-group block-reset">
				<label>Password w/ Confirmation</label>
				<input type="password" name="password" placeholder="Minimum rating: 30%" data-validation="password" data-validate-key="true" required>
				<div class="input-addon">repeat</div>
				<input type="password" name="password-match" placeholder="Repeat password" data-validation="match" required>
			</div>

			<label>Select</label>
			<select name="country" data-validation="select" data-countries="scripts/dev/data/countries.json" required>
				<option class="placeholder" value="">Country</option>
			</select>

			<label>Textarea</label>
			<textarea name="textarea" rows="2" cols="20" placeholder="Default text"></textarea>

			<fieldset>
				<legend>Radio Buttons</legend>

				<input id="f1" type="radio" name="option-group" value="1">
				<label for="f1">Select this to choose the following lipsum</label>

				<input id="f2" type="radio" name="option-group" value="2">
				<label for="f2">Select this to choose the Terms &amp; lipsum</label>

				<input id="f3" type="radio" name="option-group" value="2">
				<label for="f3">Select this to choose lipsum</label>
			</fieldset>

			<fieldset>
				<legend>Checkboxes</legend>

				<input id="f5" type="checkbox" name="check-accept" value="1">
				<label for="f5">I accept the following lipsum</label>

				<input id="f6" type="checkbox" name="check-terms" value="2">
				<label for="f6">Terms &amp; lipsum</label>

				<input id="f7" type="checkbox" name="check-subscribe" value="2" checked>
				<label for="f7">Uncheck if you don't want to lipsum</label>
			</fieldset>

			<fieldset>
				<legend>Toggles</legend>

				<input id="f105" type="toggle" />
				<label for="f105">I accept the following lipsum</label>

				<input id="f106" type="toggle" />
				<label for="f106">Terms &amp; lipsum</label>

				<input id="f107" type="toggle" checked />
				<label for="f107">Uncheck if you don't want to lipsum</label>
			</fieldset>

			<button class="primary" type="submit">Validate and Send</button>
			<button type="reset">Reset</button>

			<img class="form-loader" src="img/loader.gif" height="32" width="32" alt="">
			<img class="svg icon icon-tick form-done" src="img/icons/icon-tick.svg" onerror="this.onerror=null;this.src='img/icons/icon-tick.png'">
		</form>



		<hr>



		<a href="#" class="anchor" id="states"></a>

		<h2>Validation States</h2>

		<div class="row">
			<div class="column" data-span="3">
				<input type="text" name="text" placeholder="Valid input" class="valid" required>
			</div>
			<div class="column" data-span="3">
				<input type="text" name="text" placeholder="Invalid input" class="invalid" required>
			</div>
			<div class="column" data-span="3">
				<input type="text" name="text" placeholder="Readonly input" readonly>
			</div>
			<div class="column" data-span="3">
				<input type="text" name="text" placeholder="Disabled input" disabled>
			</div>
		</div>

		<div class="row">
			<div class="column" data-span="3">
				<select class="valid" name="test" data-validation="select" required>
					<option class="placeholder" value="">Valid select</option>
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
			</div>
			<div class="column" data-span="3">
				<select class="invalid" name="test" data-validation="select" required>
					<option class="placeholder" value="">Invalid select</option>
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
			</div>
			<div class="column" data-span="3">
				<select name="test" data-validation="select" readonly>
					<option class="placeholder" value="">Readonly select</option>
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
			</div>
			<div class="column" data-span="3">
				<select name="test" data-validation="select" disabled>
					<option class="placeholder" value="">Disabled select</option>
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
			</div>
		</div>

		<div class="row">
			<div class="column" data-span="3">
				<textarea class="valid" name="textarea" cols="30" rows="5" required>Valid textarea</textarea>
			</div>
			<div class="column" data-span="3">
				<textarea class="invalid" name="textarea" cols="30" rows="5" required>Invalid textarea</textarea>
			</div>
			<div class="column" data-span="3">
				<textarea name="textarea" cols="30" rows="5" readonly>Readonly textarea</textarea>
			</div>
			<div class="column" data-span="3">
				<textarea name="textarea" cols="30" rows="5" disabled>Disabled textarea</textarea>
			</div>
		</div>

		<div class="row">
			<div class="column" data-span="3">
				<input class="valid" id="f200" type="checkbox" name="checkbox" required checked>
				<label for="f200">Valid checkbox</label>
			</div>
			<div class="column" data-span="3">
				<input class="invalid" id="f201" type="checkbox" name="checkbox" required>
				<label for="f201">Invalid checkbox</label>
			</div>
			<div class="column" data-span="3">
				<input id="f202" type="checkbox" name="checkbox" readonly>
				<label for="f202">Readonly checkbox</label>
			</div>
			<div class="column" data-span="3">
				<input id="f203" type="checkbox" name="checkbox" disabled>
				<label for="f203">Disabled checkbox</label>
			</div>
		</div>

		<div class="row">
			<div class="column" data-span="3">
				<input class="valid" id="f208" type="radio" name="radio-demo" required checked>
				<label for="f208">Valid radio</label>
			</div>
			<div class="column" data-span="3">
				<input class="invalid" id="f209" type="radio" name="radio-demo" required>
				<label for="f209">Invalid radio</label>
			</div>
			<div class="column" data-span="3">
				<input id="f210" type="radio" name="radio-demo" readonly>
				<label for="f210">Readonly radio</label>
			</div>
			<div class="column" data-span="3">
				<input id="f211" type="radio" name="radio-demo" disabled>
				<label for="f211">Disabled radio</label>
			</div>
		</div>

		<div class="row">
			<div class="column" data-span="3">
				<input class="valid" id="f212" type="toggle" name="toggle-demo" required checked>
				<label for="f212">Valid toggle</label>
			</div>
			<div class="column" data-span="3">
				<input class="invalid" id="f213" type="toggle" name="toggle-demo" required>
				<label for="f213">Invalid toggle</label>
			</div>
			<div class="column" data-span="3">
				<input id="f214" type="toggle" name="toggle-demo" readonly>
				<label for="f214">Readonly toggle</label>
			</div>
			<div class="column" data-span="3">
				<input id="f215" type="toggle" name="toggle-demo" disabled>
				<label for="f215">Disabled toggle</label>
			</div>
		</div>



		<hr>



		<a href="#" class="anchor" id="select"></a>

		<h2>Select</h2>

		<select>
			<option class="placeholder" value="">Please select...</option>
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
	&lt;option <span class="emphasis">class="placeholder" value=""</span>&gt;Please select...&lt;/option&gt;
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
			<option class="placeholder" value="">Please select...</option>
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
	&lt;option <span class="emphasis">class="placeholder" value=""</span>&gt;Please select...&lt;/option&gt;
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

			<input id="f101" type="checkbox" name="checkbox">
			<label for="f101">Checkbox</label>

			<input id="f102" type="checkbox" name="checkbox2" checked>
			<label for="f102">Checkbox Checked</label>
		</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Checkboxes Group&lt;/legend&gt;

	&lt;input id="f101" type="checkbox" name="checkbox"&gt;
	&lt;label for="f101"&gt;Checkbox&lt;/label&gt;
&lt;/fieldset&gt;
</pre>

		<br>

		<h4>Radio Buttons</h4>

		<fieldset>
			<legend>Radio Buttons Group</legend>

			<input id="f103" type="radio" name="radio" value="1">
			<label for="f103">Radio</label>

			<input id="f104" type="radio" name="radio" value="2" checked>
			<label for="f104">Radio Checked</label>
		</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Radio Buttons Group&lt;/legend&gt;

	&lt;input id="f102" type="radio" name="radio" value="1"&gt;
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

			<input id="f105" type="toggle" />
			<label for="f105">Toggle</label>

			<input id="f106" type="toggle" checked />
			<label for="f106">Toggle Checked</label>
		</fieldset>

<pre>
&lt;fieldset&gt;
	&lt;legend&gt;Toggles Group&lt;/legend&gt;

	&lt;input id="f103" type="toggle" /&gt;
	&lt;label for="f103"&gt;Toggle&lt;/label&gt;
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



		<hr>



		<a href="#" class="anchor" id="buttons"></a>

		<h2>Buttons</h2>

		<button class="primary" type="submit">Validate and Send</button>
		<button disabled>Disabled</button>
		<button type="reset">Reset</button>



		<hr>



		<a href="#" class="anchor" id="buttons"></a>

		<h2>Example Form (Payment)</h2>

		<form action="#" novalidate data-validation="true">
			<div class="card-wrapper framed">
				<div class="row">
					<div class="column" data-span="6">
						<div class="card-type valign-middle">
							<img src="img/icons/cards/generic.png">
							<span class="font-medium">Payment Details</span>
						</div>
					</div>
					<div class="column mobile-hide" data-span="2">
						&nbsp;
					</div>
					<div class="column" data-span="4">
						<select name="payment-method" data-validation="select" required>
							<option class="placeholder" value="">Payment Method</option>
							<option value="Credit/Debit Card">Credit/Debit Card</option>
							<option value="PayPal">PayPal</option>
							<option value="Google Checkout">Google Checkout</option>
							<option value="Amazon Payments">Amazon Payments</option>
						</select>
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
						<label>Expiry Date</label>
						<select name="card-expiry-month" data-validation="select" required>
							<option class="placeholder" value="">Month</option>
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
							<option class="placeholder" value="">Year</option>
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
					<div class="column" data-span="6">
						<label>CCV</label>
						<input type="number" name="ccv" placeholder="3 digit security code" data-tooltip="<img src='img/icons/cards/ccv.png'>" data-validation="number" required>
					</div>
				</div>
			</div>

			<button class="primary" type="submit">Validate and Send</button>
		</form>
	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>