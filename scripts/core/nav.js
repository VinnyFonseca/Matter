function initNav() {
	var page,
		url = this.location.href,
		section = url.split("/"),
		nav = $("nav"),
		scrolling = false;

	for ( var i = 0; i < section.length; i++ ) page = section[section.length - 1].split(".")[0];


	nav.children("a[href^='#']")
		.each(function() {
			var link = $(this).attr("href"),
				anchor = $(link);

			if ( $(this).offset().top >= anchor.offset().top - 80 ) {
				nav.children("a").removeClass("active");
				$(this).addClass("active");
			}
		})
		.on("click", function() {
			scrolling = true;

			$("header").removeClass("active");
			nav.children("a").removeClass("active");
			$(this).addClass("active");

			setTimeout(function() {
				scrolling = false;
			}, 1000);
		});

	$(window).on("scroll", function() {
		nav.children("a[href^='#']").each(function() {
			var link = $(this).attr("href"),
				anchor = $(link);

			if ( $(this).offset().top >= anchor.offset().top - 160 && scrolling === false ) {
				nav.children("a").removeClass("active");
				$(this).addClass("active");
			}
		});
	});

	nav.children("a").removeClass("active");
	var navActive = page.length ? nav.children("a[href*=" + page + "]").addClass("active") : nav.children("a").eq(0).addClass("active");


	$(".nav-trigger").on("click", function() {
		$("header").toggleClass("active");
	});
	$("html").on("click", function(event) {
		if ( !$(event.target).closest("header").length ) $("header").removeClass("active");
	});


	if ( config.application.debug ) console.log("System :: Navigation");
}
