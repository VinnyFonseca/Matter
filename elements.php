<?php include("include/head.php"); ?>
<?php include("include/header.php"); ?>


<div class="main">
	<div class="wrapper">

		<a href="#" class="anchor" id="elements"></a>

		<h2>Elements &amp; Typography</h2>


		<ul>
			<li>
				<a href="#block">Block Level Elements</a>
			</li>
			<li>
				<a href="#headings">Headings</a>
			</li>
			<li>
				<a href="#text">Text Elements</a>
			</li>
			<li>
				<a href="#hyphenation">Hyphenation</a>
			</li>
			<li>
				<a href="#lists">Lists</a>
			</li>
			<li>
				<a href="#tables">Tables</a>
			</li>
			<li>
				<a href="#character">Character Test</a>
			</li>
		</ul>


		<hr>


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
				<a href="http://matterframework.net" target="_blank" class="explicit">Lorem ipsum Duis eu laboris veniam sed anim.</a>
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


		<a href="#" class="anchor" id="headings"></a>

		<h2>Headings</h2>

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
				<h2>Sample Heading</h2>
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
				<h4>Sample Heading</h4>
			</dd>
			<dt>
				<code>h6</code>
			</dt>
			<dd>
				<h6>Sample Heading</h6>
			</dd>
		</dl>


		<hr>


		<a href="#" class="anchor" id="text"></a>

		<h2>Text Elements</h2>

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

		<table id="table-1" summary="Each row names a Nordic country and specifies its total area and land area, in square kilometers">
			<caption>Sample table: Areas of the Nordic countries, in sq km</caption>

			<tbody>
				<tr>
					<th scope="col">Country</th>
					<th scope="col">Total area</th>
					<th scope="col">Land area</th>
				</tr>
				<tr>
					<th scope="row">Denmark</th>
					<td> 43,070 </td>
					<td> 42,370</td>
				</tr>
				<tr>
					<th scope="row">Finland</th>
					<td>337,030 </td>
					<td>305,470</td>
				</tr>
				<tr>
					<th scope="row">Iceland</th>
					<td>103,000 </td>
					<td>100,250</td>
				</tr>
				<tr>
					<th scope="row">Norway</th>
					<td>324,220 </td>
					<td>307,860</td>
				</tr>
				<tr>
					<th scope="row">Sweden</th>
					<td>449,964 </td>
					<td>410,928</td>
				</tr>
			</tbody>
		</table>


		<hr>


		<a href="#" class="anchor" id="character"></a>

		<h2>Character Test</h2>

		<p>
			The following table has no caption, and has some sample characters with annotations. If the browser's default font does notcontain all of them, they may get displayed using backup fonts. This may cause stylistic differences, but it should not prevent the characters from being displayed at all.
		</p>

		<table id="table-2">
			<tbody>
				<tr>
					<th>Char.</th>
					<th>Explanation</th>
					<th>HTML Entity</th>
					<th>Unicode</th>
					<th>Notes</th>
				</tr>
				<tr>
					<th scope="row">ê</td>
					<td>e with circumflex</td>
					<td><code>&amp;ecirc;</code></td>
					<td><code>&amp;#234;</code></td>
					<td>Latin 1 character</td>
				</tr>
				<tr>
					<th scope="row">—</td>
					<td>em dash</td>
					<td><code>&amp;mdash;</code></td>
					<td><code>&amp;#8212;</code></td>
					<td>Windows Latin 1 character</td>
				</tr>
				<tr>
					<th scope="row">Ā</td>
					<td>A with macron (line above)</td>
					<td><code>&amp;Amacr;</code></td>
					<td><code>&amp;#256;</code></td>
					<td>Latin Extended-A character</td>
				</tr>
				<tr>
					<th scope="row">Ω</td>
					<td>capital omega</td>
					<td><code>&amp;Omega;</code></td>
					<td><code>&amp;#937;</code></td>
					<td>Greek letter</td>
				</tr>
				<tr>
					<th scope="row">−</td>
					<td>minus sign</td>
					<td><code>&amp;minus;</code></td>
					<td><code>&amp;#8722;</code></td>
					<td>Unicode minus</td>
				</tr>
				<tr>
					<th scope="row">Ø</td>
					<td>diameter sign</td>
					<td><code>&amp;Oslash;</code></td>
					<td><code>&amp;#216;</code></td>
					<td>Relatively rare</td>
				</tr>
			</tbody>
		</table>

	</div>
</div>


<?php include("include/footer.php"); ?>
<?php include("include/foot.php"); ?>