// Tables

var initTables = function() {
	if ( config.tables.responsive && $("table").length ) {
		$("table").each(function(index) {
			var el = $(this);

			el.attr("id", "table-" + index);

			var id = this.id,
				table = document.getElementById(id),
				data = [],
				headers = [];

			el.addClass("table-original");

			for ( var i = table.rows[0].cells.length - 1; i >= 0; i-- ) {
				headers[i] = table.rows[0].cells[i].innerHTML;
			}

			for ( var j = table.rows.length - 1; j >= 1; j-- ) {
				var tableRow = table.rows[j]; var rowData = {};

				for ( var k = 0; k < tableRow.cells.length; k++ ) {
					rowData[headers[k]] = tableRow.cells[k].innerHTML;
				}

				data.push(rowData);
			}

			for ( var l = 0; l < data.length; l++ ) {
				var rowGroup = data[l];
				var mobileTableRaw = '<table class="' + id + '-row-' + l + ' table-mirror">\
										  <tbody>\
										  </tbody>\
									  </table>';

				$(mobileTableRaw).insertAfter(el);

				var mobileTable = $('.' + id + '-row-' + l);
				if ( el.children("caption").length ) mobileTable.prepend("<caption>Row of " + el.children("caption").html() + "</caption>");

				for ( var key in rowGroup ) {
					var row = '<tr>\
								   <th scope="row">' + key + '</th>\
								   <td>' + rowGroup[key] + '</td>\
							   </tr>';

					mobileTable.children("tbody").append(row);
				}
			}
		});

		if ( config.application.debug ) console.log("System :: Tables");
	}
}