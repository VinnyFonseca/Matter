// Index

var introParallax = function() {
	$(".intro .parallax").css({
		"-webkit-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"-moz-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"-ms-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"-o-transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"transform": "translate3d(0, " + matter.doc().top / 2 + "px, 0)",
		"opacity": 1 - (matter.doc().top / 500)
	});
}

$(window).on("scroll", function() {
	requestAnimationFrame(introParallax);
});