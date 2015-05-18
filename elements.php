<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main docs">

	<div class="sidebar">
		<div class="sidebar-trigger"></div>
		<h3>Elements</h3>
	</div>


	<div class="wrapper">

		<a href="#" class="anchor" id="block"></a>

		<h2>Block Level Elements</h2>

		<dl>
			<dt>
				<code>a</code>
			</dt>
			<dd>
				<a href="#">Lorem ipsum Duis eu laboris veniam sed anim.</a>
			</dd>

			<dt>
				<code>a target="_blank"</code>
			</dt>
			<dd>
				<a href="#" target="_blank">Lorem ipsum Duis eu laboris veniam sed anim.</a>
			</dd>

			<dt>
				<code>a.explicit</code>
			</dt>
			<dd>
				<a href="http://matterframework.net" class="explicit">Lorem ipsum Duis eu laboris veniam sed anim.</a>
			</dd>

			<dt>
				<code>p</code>
			</dt>
			<dd>
				<p>
					Lorem ipsum Magna dolore adipisicing consectetur Ut voluptate consequat minim sunt laborum in mollit nulla aute fugiat Excepteur nulla fugiat Duis ut officia velit aute sit in id nostrud pariatur exercitation ut quis nulla amet nostrud dolore in commodo culpa Excepteur Duis deserunt ea reprehenderit sit laborum enim irure dolore fugiat dolor dolore dolor Ut amet labore ullamco aute elit in tempor Ut in nulla aliqua officia consequat.
				</p>
				<p>
					This is another paragraph. A small one at that.
				</p>
			</dd>

			<dt>
				<code>blockquote</code> and <code>cite</code>
			</dt>
			<dd>
				<blockquote>
					<p>
						Lorem ipsum Culpa sit dolor nostrud nulla minim elit consequat occaecat exercitation dolor et anim enim amet id veniam amet ea reprehenderit commodo in sunt tempor adipisicing velit minim irure ea ea nisi cillum ea pariatur in ad aliquip consectetur aliquip Duis.
					</p>
					<cite>
						<a href="http://www.w3.org/html/wg/drafts/html/master/text-level-semantics.html#the-cite-element">4.51 the Cite element</a> , Berjon et al. 2013
					</cite>
				</blockquote>
			</dd>

			<dt>
				<code>address</code>
			</dt>
			<dd>
				<address>
					<a href="#" lang="fi" hreflang="en">Company name</a>
					<a href="mailto:test@test.com">test@test.com</a>
					100, Street Name, City, Postcode
				</address>
			</dd>
		</dl>


		<hr>


		<a href="#" class="anchor" id="iconography"></a>

		<h2>Iconography</h2>

		<p class="emphasis">
			Note: Matter has automatic svg injection from <code>img.svg.icon</code> elements.
		</p>

		<div class="icon-wrapper">
			<div class="icon-container" data-icon="arrow-up" data-tooltip="arrow-up">
				<img class="svg icon icon-arrow-up" src="img/icons/icon-arrow-up.svg" onerror="this.onerror=null;this.src='img/icons/icon-arrow-up.png'">
			</div>

			<div class="icon-container" data-icon="arrow-right" data-tooltip="arrow-right">
				<img class="svg icon icon-arrow-right" src="img/icons/icon-arrow-right.svg" onerror="this.onerror=null;this.src='img/icons/icon-arrow-right.png'">
			</div>

			<div class="icon-container" data-icon="arrow-down" data-tooltip="arrow-down">
				<img class="svg icon icon-arrow-down" src="img/icons/icon-arrow-down.svg" onerror="this.onerror=null;this.src='img/icons/icon-arrow-down.png'">
			</div>

			<div class="icon-container" data-icon="arrow-left" data-tooltip="arrow-left">
				<img class="svg icon icon-arrow-left" src="img/icons/icon-arrow-left.svg" onerror="this.onerror=null;this.src='img/icons/icon-arrow-left.png'">
			</div>

			<div class="icon-container" data-icon="caret-up" data-tooltip="caret-up">
				<img class="svg icon icon-caret-up" src="img/icons/icon-caret-up.svg" onerror="this.onerror=null;this.src='img/icons/icon-caret-up.png'">
			</div>

			<div class="icon-container" data-icon="caret-right" data-tooltip="caret-right">
				<img class="svg icon icon-caret-right" src="img/icons/icon-caret-right.svg" onerror="this.onerror=null;this.src='img/icons/icon-caret-right.png'">
			</div>

			<div class="icon-container" data-icon="caret-down" data-tooltip="caret-down">
				<img class="svg icon icon-caret-down" src="img/icons/icon-caret-down.svg" onerror="this.onerror=null;this.src='img/icons/icon-caret-down.png'">
			</div>

			<div class="icon-container" data-icon="caret-left" data-tooltip="caret-left">
				<img class="svg icon icon-caret-left" src="img/icons/icon-caret-left.svg" onerror="this.onerror=null;this.src='img/icons/icon-caret-left.png'">
			</div>

			<div class="icon-container" data-icon="plus" data-tooltip="add, plus">
				<img class="svg icon icon-plus" src="img/icons/icon-plus.svg" onerror="this.onerror=null;this.src='img/icons/icon-plus.png'">
			</div>

			<div class="icon-container" data-icon="remove" data-tooltip="remove, minus">
				<img class="svg icon icon-remove" src="img/icons/icon-remove.svg" onerror="this.onerror=null;this.src='img/icons/icon-remove.png'">
			</div>

			<div class="icon-container" data-icon="close" data-tooltip="close, delete">
				<img class="svg icon icon-close" src="img/icons/icon-close.svg" onerror="this.onerror=null;this.src='img/icons/icon-close.png'">
			</div>

			<div class="icon-container" data-icon="tick" data-tooltip="tick, check">
				<img class="svg icon icon-tick" src="img/icons/icon-tick.svg" onerror="this.onerror=null;this.src='img/icons/icon-tick.png'">
			</div>

			<div class="icon-container" data-icon="download" data-tooltip="download">
				<img class="svg icon icon-download" src="img/icons/icon-download.svg" onerror="this.onerror=null;this.src='img/icons/icon-download.png'">
			</div>

			<div class="icon-container" data-icon="menu" data-tooltip="menu">
				<img class="svg icon icon-menu" src="img/icons/icon-menu.svg" onerror="this.onerror=null;this.src='img/icons/icon-menu.png'">
			</div>

			<div class="icon-container" data-icon="search" data-tooltip="search">
				<img class="svg icon icon-search" src="img/icons/icon-search.svg" onerror="this.onerror=null;this.src='img/icons/icon-search.png'">
			</div>

			<div class="icon-container" data-icon="grid" data-tooltip="grid">
				<img class="svg icon icon-grid" src="img/icons/icon-grid.svg" onerror="this.onerror=null;this.src='img/icons/icon-grid.png'">
			</div>

			<div class="icon-container" data-icon="list" data-tooltip="list">
				<img class="svg icon icon-list" src="img/icons/icon-list.svg" onerror="this.onerror=null;this.src='img/icons/icon-list.png'">
			</div>

			<div class="icon-container" data-icon="settings" data-tooltip="settings">
				<img class="svg icon icon-settings" src="img/icons/icon-settings.svg" onerror="this.onerror=null;this.src='img/icons/icon-settings.png'">
			</div>

			<div class="icon-container" data-icon="pin" data-tooltip="pin">
				<img class="svg icon icon-pin" src="img/icons/icon-pin.svg" onerror="this.onerror=null;this.src='img/icons/icon-pin.png'">
			</div>

			<div class="icon-container" data-icon="calendar" data-tooltip="calendar">
				<img class="svg icon icon-calendar" src="img/icons/icon-calendar.svg" onerror="this.onerror=null;this.src='img/icons/icon-calendar.png'">
			</div>

			<div class="icon-container" data-icon="speech-bubble" data-tooltip="speech-bubble">
				<img class="svg icon icon-speech-bubble" src="img/icons/icon-speech-bubble.svg" onerror="this.onerror=null;this.src='img/icons/icon-speech-bubble.png'">
			</div>

			<div class="icon-container" data-icon="print" data-tooltip="print">
				<img class="svg icon icon-print" src="img/icons/icon-print.svg" onerror="this.onerror=null;this.src='img/icons/icon-print.png'">
			</div>

			<div class="icon-container" data-icon="email" data-tooltip="email">
				<img class="svg icon icon-email" src="img/icons/icon-email.svg" onerror="this.onerror=null;this.src='img/icons/icon-email.png'">
			</div>

			<div class="icon-container" data-icon="facebook" data-tooltip="facebook">
				<img class="svg icon icon-facebook" src="img/icons/icon-facebook.svg" onerror="this.onerror=null;this.src='img/icons/icon-facebook.png'">
			</div>

			<div class="icon-container" data-icon="twitter" data-tooltip="twitter">
				<img class="svg icon icon-twitter" src="img/icons/icon-twitter.svg" onerror="this.onerror=null;this.src='img/icons/icon-twitter.png'">
			</div>

			<div class="icon-container" data-icon="gplus" data-tooltip="gplus">
				<img class="svg icon icon-gplus" src="img/icons/icon-gplus.svg" onerror="this.onerror=null;this.src='img/icons/icon-gplus.png'">
			</div>

			<div class="icon-container" data-icon="linkedin" data-tooltip="linkedin">
				<img class="svg icon icon-linkedin" src="img/icons/icon-linkedin.svg" onerror="this.onerror=null;this.src='img/icons/icon-linkedin.png'">
			</div>

			<div class="icon-container" data-icon="instagram" data-tooltip="instagram">
				<img class="svg icon icon-instagram" src="img/icons/icon-instagram.svg" onerror="this.onerror=null;this.src='img/icons/icon-instagram.png'">
			</div>

			<div class="icon-container" data-icon="youtube" data-tooltip="youtube">
				<img class="svg icon icon-youtube" src="img/icons/icon-youtube.svg" onerror="this.onerror=null;this.src='img/icons/icon-youtube.png'">
			</div>

			<div class="icon-container" data-icon="share" data-tooltip="share">
				<img class="svg icon icon-share" src="img/icons/icon-share.svg" onerror="this.onerror=null;this.src='img/icons/icon-share.png'">
			</div>

			<div class="icon-container" data-icon="play" data-tooltip="play">
				<img class="svg icon icon-play" src="img/icons/icon-play.svg" onerror="this.onerror=null;this.src='img/icons/icon-play.png'">
			</div>

			<div class="icon-container" data-icon="pause" data-tooltip="pause">
				<img class="svg icon icon-pause" src="img/icons/icon-pause.svg" onerror="this.onerror=null;this.src='img/icons/icon-pause.png'">
			</div>
		</div>

<pre>
&lt;img class="svg icon icon-<span class="emphasis">name</span>" src="img/icons/icon-<span class="emphasis">name</span>.svg" onerror="this.onerror=null;this.src='img/icons/icon-<span class="emphasis">name</span>.png'"&gt;
</pre>


		<hr>


		<a href="#" class="anchor" id="typography"></a>

		<h2>Typography</h2>

		<dl>
			<dt>
				<code>h1</code>
			</dt>
			<dd>
				<h1>Sample Heading</h1>
			</dd>
			<dt>
				<code>h2</code>
			</dt>
			<dd>
				<h2>Sample Heading</h2>
			</dd>
			<dt>
				<code>h3</code>
			</dt>
			<dd>
				<h3>Sample Heading</h3>
			</dd>
			<dt>
				<code>h4</code>
			</dt>
			<dd>
				<h4>Sample Heading</h4>
			</dd>
			<dt>
				<code>h5</code>
			</dt>
			<dd>
				<h5>Sample Heading</h5>
			</dd>
			<dt>
				<code>h6</code>
			</dt>
			<dd>
				<h6>Sample Heading</h6>
			</dd>
		</dl>


		<hr>


		<a href="#" class="anchor" id="elements"></a>

		<h2>Typographic Elements</h2>

		<dl>
			<dt>
				<code>abbr</code> <small class="normal emphasis">(:hover)</small>
			</dt>
			<dd>
				<abbr title="Cascading Style Sheets">CSS</abbr>
			</dd>

			<dt>
				<code>acronym</code> <small class="normal emphasis">(:hover)</small>
			</dt>
			<dd>
				<acronym title="Radio Detecting and Ranging">radar</acronym>
			</dd>

			<dt>
				<code>b</code>
			</dt>
			<dd>
				<b>Bold text</b>.
			</dd>

			<dt>
				<code>big</code>
			</dt>
			<dd>
				<big>Bigger text</big>.
			</dd>

			<dt>
				<code>cite</code>
			</dt>
			<dd>
				<cite>Citation used here</cite>
			</dd>

			<dt>
				<code>code</code>
			</dt>
			<dd>
				<code>a[i] = b[i] + c[i];</code>
			</dd>

			<dt>
				<code>del</code>
			</dt>
			<dd>
				<del>Deleted text</del>.
			</dd>

			<dt>
				<code>dfn</code>
			</dt>
			<dd>
				<dfn>Defintion content</dfn>.
			</dd>

			<dt>
				<code>em</code>
			</dt>
			<dd>
				<em>Italic text</em>.
			</dd>

			<dt>
				<code>i</code>
			</dt>
			<dd>
				<i lang="la">Homo sapiens</i> (supports <code>lang</code> attribute, <code>"la"</code> for Latin in this case).
			</dd>

			<dt>
				<code>ins</code>
			</dt>
			<dd>
				<ins>Inserted text</ins>.
			</dd>

			<dt>
				<code>kbd</code>
			</dt>
			<dd>
				<kbd>a[i] = b[i] + c[i];</kbd>
			</dd>

			<dt>
				<code>q</code> (quotes)
			</dt>
			<dd>
				<q>Hello!</q>
			</dd>

			<dt>
				<code>q</code> (nested)
			</dt>
			<dd>
				<q>She said <q>Hello!</q></q>.
			</dd>

			<dt>
				<code>samp</code>
			</dt>
			<dd>
				<samp>a[i] = b[i] + c[i];</samp>
			</dd>

			<dt>
				<code>small</code>
			</dt>
			<dd>
				<small>Small text.</small>
			</dd>

			<dt>
				<code>strike</code> or <code>s</code> (non-standard)
			</dt>
			<dd>
				<strike>Strikethrough text</strike>.
			</dd>

			<dt>
				<code>strong</code>
			</dt>
			<dd>
				<strong>Strong text</strong>.
			</dd>

			<dt>
				<code>sub</code>
			</dt>
			<dd>
				X<sub>1</sub> and H<sub>2</sub>O
			</dd>

			<dt>
				<code>sup</code>
			</dt>
			<dd>
				M<sup>lle</sup>, 1<sup>st</sup>, e<sup>x</sup>, sin<sup>2</sup> <i>x</i>, e<sup>x<sup>2</sup></sup> and f(x)<sup>g(x)<sup>a+b+c</sup></sup>
			</dd>

			<dt>
				<code>tt</code>
			</dt>
			<dd>
				<tt>Monospace text</tt>.
			</dd>

			<dt>
				<code>u</code>
			</dt>
			<dd>
				<u>Underlined text</u>.
			</dd>

			<dt>
				<code>var</code>
			</dt>
			<dd>
				<var>variable</var> used.
			</dd>

		</dl>

		<p>
			Some of the elements tested above are typically displayed in a monospace font, often using the <strong>same</strong> presentation for all of them.
		</p>

		<ul>
			<li><code>This is sample text inside code markup</code></li>
			<li><kbd>This is sample text inside kbd markup</kbd></li>
			<li><samp>This is sample text inside samp markup</samp></li>
			<li><tt>This is sample text inside tt markup</tt></li>
		</ul>

		<p class="emphasis">
			Note: <code>pre</code> is the only element that preserves whitespace, space characters, tabs, and carriage returns.
		</p>

<pre>
&lt;head&gt;
	&lt;meta charset="UTF-8"&gt;
	&lt;meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"&gt;
&lt;/head&gt;
</pre>


		<hr>


		<a href="#" class="anchor" id="hyphenation"></a>

		<h2>Hyphenation</h2>

		<p class="emphasis">Note: Resize to see the hyphenation in action.</p>

		<h4>No hyphenation</h4>

		<p class="limited hyphens">
			Until recently the great majority of naturalists believed that species were immutable productions, and had been separately created. This view has been ably maintained by many authors.
		</p>

		<h4>Moderate hyphenation</h4>

		<p class="limited hyphenate">
			Until re­cently the great ma­jor­ity of nat­u­ral­ists be­lieved that species were im­mutable pro­duc­tions, and had been sep­a­rately cre­ated. This view has been ably main­tained by many au­thors.
		</p>

		<h4>Heavy hyphenation - explicit hyphenation hints (soft hyphens)</h4>

		<p class="limited">
			Un­til re­cent­ly the great ma­jor­i­ty of nat­u­ral­ists be­lieved that spe­cies were im­mu­ta­ble pro­duc­tions, and had been sep­a­rate­ly cre­at­ed. This view has been ably main­tain­ed by many au­thors.
		</p>


		<hr>


		<a href="#" class="anchor" id="lists"></a>

		<h2>Lists</h2>

		<p>All lists are styled as <code>list-style-position: outside;</code> as it allows a better <strong>separation of content</strong> and <strong>visual hierarchy</strong> of elements.</p>

		<p><code>menu</code> and <code>dir</code> have <code>list-style-position: inside;</code> and cannot be overridden.</p>

		<dl>
			<dt>
				<code>ul</code>
			</dt>
			<p>Unordered list. General purpose.</p>
			<dd>
				<ul>
					<li>List item.</li>
					<li>List item.</li>
					<li>List item. Lorem ipsum Dolore sunt elit ad proident aliqua magna non labore sed quis irure cillum cillum enim ullamco tempor enim dolore Duis ea elit et et magna consequat ut cillum esse occaecat.</li>
					<li>List item. Lorem ipsum Ad laborum nulla cillum non ullamco reprehenderit aute Duis eu tempor quis Excepteur sit mollit adipisicing irure in.</li>
				</ul>
			</dd>
			<dt>
				<code>ol</code>
			</dt>
			<dd>
				<ol>
					<li>List item.</li>
					<li>List item.</li>
					<li>List item. Lorem ipsum Et consectetur adipisicing Duis eiusmod adipisicing incididunt cupidatat officia aute consectetur ut mollit pariatur voluptate incididunt sit in ad et officia veniam.</li>
					<li>List item. Lorem ipsum Irure enim anim aliqua deserunt Excepteur sint exercitation commodo laborum proident id.</li>
				</ol>
			</dd>
			<dt>
				<code>menu</code>
			</dt>
			<dd>
				<menu>
					<li>List item.</li>
					<li>List item.</li>
					<li>List item. Lorem ipsum Incididunt fugiat ex ex aliquip Excepteur in sint aute dolor qui qui deserunt voluptate enim esse ad proident exercitation quis in non anim dolor Duis ad irure velit.</li>
					<li>List item. Lorem ipsum Dolore cupidatat Ut veniam aliqua commodo cupidatat esse quis ut velit mollit id fugiat exercitation cillum.</li>
				</menu>
			</dd>
			<dt>
				<code>dir</code>
			</dt>
			<dd>
				<dir>
				 	<li>List item.</li>
					<li>List item.</li>
					<li>List item. Lorem ipsum Fugiat minim in in ullamco amet ut esse aliqua et culpa labore et consequat cupidatat eu ad in nulla irure ut eiusmod id nostrud proident.</li>
					<li>List item. Lorem ipsum Anim magna sed et ad officia sunt et esse deserunt non consectetur in sunt ea aute labore qui.</li>
				</dir>
			</dd>
		</dl>

		<h4>Definition List</h4>

		<p>
			Such a list should consist of <strong>terms</strong> and associated <strong>definitions</strong>.
		</p>

		<dl>
			<dt>Recursion</dt>
			<dd>
				See recursion.
			</dd>

			<dt>Recursion, indirect</dt>
			<dd>
				See indirect recursion.
			</dd>

			<dt>Indirect recursion</dt>
			<dd>
				See recursion, indirect.
			</dd>

			<dt>Term</dt>
			<dd>
				A word or other expression taken into specific use in a well-defined meaning.
			</dd>
		</dl>

<pre>
&lt;dl&gt;
	&lt;dt&gt;Recursion&lt;/dt&gt;
	&lt;dd&gt;
		See recursion.
	&lt;/dd&gt;

	&lt;dt&gt;Recursion, indirect&lt;/dt&gt;
	&lt;dd&gt;
		See indirect recursion.
	&lt;/dd&gt;

	&lt;dt&gt;Indirect recursion&lt;/dt&gt;
	&lt;dd&gt;
		See recursion, indirect.
	&lt;/dd&gt;

	&lt;dt&gt;Term&lt;/dt&gt;
	&lt;dd&gt;
		A word or other expression taken into specific use in a well-defined meaning.
	&lt;/dd&gt;
&lt;/dl&gt;
</pre>


		<hr>


		<a href="#" class="anchor" id="tables"></a>

		<h2>Tables (Responsive)</h2>

		<p>
			The following table has a caption. The first row and the first column contain header cells (<code>th</code>) only. Other cells are data cells (<code>td</code>).
		</p>

		<table summary="Each row names a Nordic country and specifies its total area and land area, in square kilometers">
			<caption>Sample table: Areas of the Nordic countries, in sq km</caption>

			<tr>
				<td>Country</td>
				<td>Total area</td>
				<td>Land area</td>
			</tr>
			<tr>
				<td>Denmark</td>
				<td>43,070</td>
				<td>42,370</td>
			</tr>
			<tr>
				<td>Finland</td>
				<td>337,030</td>
				<td>305,470</td>
			</tr>
			<tr>
				<td>Iceland</td>
				<td>103,000</td>
				<td>100,250</td>
			</tr>
			<tr>
				<td>Norway</td>
				<td>324,220</td>
				<td>307,860</td>
			</tr>
			<tr>
				<td>Sweden</td>
				<td>449,964</td>
				<td>410,928</td>
			</tr>
		</table>

		<h4>Character Test</h4>

		<p>
			The following table has no caption, and has some sample characters with annotations. If the browser's default font does notcontain all of them, they may get displayed using backup fonts. This may cause stylistic differences, but it should not prevent the characters from being displayed at all.
		</p>

		<table>
			<tr>
				<td>Char.</td>
				<td>Explanation</td>
				<td>HTML Entity</td>
				<td>Unicode</td>
				<td>Notes</td>
			</tr>
			<tr>
				<td>ê</td>
				<td>e with circumflex</td>
				<td><code>&amp;ecirc;</code></td>
				<td><code>&amp;#234;</code></td>
				<td>Latin 1 character</td>
			</tr>
			<tr>
				<td>—</td>
				<td>em dash</td>
				<td><code>&amp;mdash;</code></td>
				<td><code>&amp;#8212;</code></td>
				<td>Windows Latin 1 character</td>
			</tr>
			<tr>
				<td>Ā</td>
				<td>A with macron (line above)</td>
				<td><code>&amp;Amacr;</code></td>
				<td><code>&amp;#256;</code></td>
				<td>Latin Extended-A character</td>
			</tr>
			<tr>
				<td>Ω</td>
				<td>capital omega</td>
				<td><code>&amp;Omega;</code></td>
				<td><code>&amp;#937;</code></td>
				<td>Greek letter</td>
			</tr>
			<tr>
				<td>−</td>
				<td>minus sign</td>
				<td><code>&amp;minus;</code></td>
				<td><code>&amp;#8722;</code></td>
				<td>Unicode minus</td>
			</tr>
			<tr>
				<td>Ø</td>
				<td>diameter sign</td>
				<td><code>&amp;Oslash;</code></td>
				<td><code>&amp;#216;</code></td>
				<td>Relatively rare</td>
			</tr>
		</table>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>