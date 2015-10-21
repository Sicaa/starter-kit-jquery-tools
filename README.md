# starter-kit-jquery-tools

Collection of useful jQuery tools

## Requirements

- jQuery >= 1.*

## Table of Contents

- [Pagination](#pagination)

## Pagination

The pagination plugin is designed to easily generate pagination links, and is particulary useful if your content is loaded via AJAX.
Note that HTML elements generated are based on Bootstrap >= 3.* pagination component.

### Parameters

- totalLines: total of items (used to calculate the number of pages, default 0),
- linesPerPage: number of items we want to display per page (default 15),
- nbPagesToShow: number of buttons to display around the current page (default 10),
- actualPage: current page you're on (default 1),
- callback: function to call on page change.

### Example

```html
<!-- Don't forget to include jQuery, the plugin itself, and Bootstrap CSS (if you use it) first -->

<div id="content"></div> <!-- Content we display -->
<ul class="pagination"></ul> <!-- Pagination container -->

<script type="text/javascript">
	$(document).ready(function() {
		var linesPerPage = 1;

		function ajxSearch(wantedPage) {
			$.ajax({
				url: 'https://api.github.com/users/Sicaa/repos', // Getting all my repos :)
				dataType: 'json',
				type: 'GET',
				success: function(data) {
					var total = data.length; // Total of items

					$.ajax({
						url: 'https://api.github.com/users/Sicaa/repos?per_page=' + linesPerPage + '&page=' + wantedPage, // Getting just what we want for the pagination
						dataType: 'json',
						type: 'GET',
						success: function(r) {
							$('#content').html('').append('<p>' + r[0].name + '</p><p>' + r[0].description + '</p>'); // Filling the content section

							$('.pagination').pagination({
								totalLines: total,
								linesPerPage: linesPerPage,
								nbPagesToShow: 10,
								actualPage: wantedPage,
								callback: ajxSearch
							});
						},
						error: function(e) {
							throw new Error(e);
						}
					});
				},
				error: function(e) {
					throw new Error(e);
				}
			});
		}

		ajxSearch(1); // First call, we want page 1
	});
</script>
```