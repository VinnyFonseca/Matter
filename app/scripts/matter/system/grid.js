// Responsive Breakpoint Debugging and Discovery

matter.grid = {
  isVisible: false,

  init: function() {
  	if ( matter.config.application.debug ) {
      var self = this;

  		$(".grid-trigger").removeClass("hidden").on("click", function() {
        self.display();
  		});
  	}
  },

  display: function() {
    if ( this.isVisible ) {
      document.querySelector('.column-grid').style.maxHeight = '0';
    } else {
      document.querySelector('.column-grid').style.maxHeight = '100%';
    }

    this.isVisible = !this.isVisible;
  }
}