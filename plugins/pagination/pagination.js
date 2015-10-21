jQuery(function() {
	jQuery.fn.pagination = function(args) {
		args = jQuery.extend({
			// Total of lines
			totalLines: 0,
			// Number of lines per page
			linesPerPage: 15,
			// Number of buttons to display around the current page
			nbPagesToShow: 10,
			// Current page
			actualPage: 1,
			// Function to call on button click
			callback: function(){}
		}, args);

		return this.each(function() {
			if (isNaN(parseInt(args.totalLines)) || isNaN(parseInt(args.linesPerPage)) || isNaN(parseInt(args.nbPagesToShow)) || isNaN(parseInt(args.actualPage)))
				throw new Error('int params required');

			var obj = jQuery(this);
			obj.css('display', 'none').html('');

			var plus10 = false;
			var minus10 = false;

			var nbPagesToShow = args.nbPagesToShow;
			var nbPagesEachSides = Math.floor((nbPagesToShow - 1) / 2);
			var nbPagesLeftSide = nbPagesEachSides;
			var nbPagesRightSide = nbPagesEachSides;
			
			var totalPages = Math.ceil(args.totalLines / args.linesPerPage);

			if ((args.actualPage + nbPagesEachSides) > totalPages)
				nbPagesRightSide = totalPages - args.actualPage;

			if (args.actualPage <= nbPagesEachSides)
				nbPagesLeftSide = args.actualPage - 1;

			if (args.actualPage > 10)
				minus10 = true;

			if (totalPages > nbPagesToShow) {
				if (totalPages > 10 && (args.actualPage + 10) < (totalPages + 1))
					plus10 = true;
			} else {
				nbPagesToShow = totalPages;
			}

			// First page
			if (args.actualPage > 1)
				obj.append('<li class="page1"><span class="numPage">&larrb;</span></li>');

			// Page -10
			if (minus10)
				obj.append('<li><span class="minus10Page">&Larr;</span></li>');
		
			// Prev page
			if (args.actualPage > 1)
				obj.append('<li><span class="prevPage">&larr;</span></li>');

			// Pages buttons display
			if (nbPagesLeftSide > 0) {
				for (var i = nbPagesLeftSide; i >= 1; i--) {
					obj.append('<li class="page' + (args.actualPage - i) + '"><span class="numPage">' + (args.actualPage - i) + '</span></li>');
				}
			}

			obj.append('<li class="active disabled"><span>' + args.actualPage + '</span></li>');

			if (nbPagesRightSide > 0) {
				for (var i = 1; i <= nbPagesRightSide; i++) {
					obj.append('<li class="page' + (args.actualPage + i) + '"><span class="numPage">' + (args.actualPage + i) + '</span></li>');
				}
			}

			// Next page
			if (args.actualPage < totalPages)
				obj.append('<li><span class="nextPage">&rarr;</span></li>');

			// Page +10
			if (plus10)
				obj.append('<li><span class="plus10Page">&Rarr;</span></li>');

			// Last page
			if (args.actualPage < totalPages)
				obj.append('<li class="page' + totalPages + '"><span class="numPage">&rarrb;</span></li>');

			obj.css('display', 'block');

			jQuery('.numPage', obj).on('click', function() {
				return args.callback(parseInt(jQuery(this).parent('li').attr('class').substr(4, 5)));
			});

			jQuery('.prevPage', obj).on('click', function() {
				return args.callback(args.actualPage - 1);
			});

			jQuery('.nextPage', obj).on('click', function() {
				return args.callback(args.actualPage + 1);
			});

			jQuery('.plus10Page', obj).on('click', function() {
				return args.callback(args.actualPage + 10);
			});

			jQuery('.minus10Page', obj).on('click', function() {
				return args.callback(args.actualPage - 10);
			});

			return obj;
		});
	}
});
