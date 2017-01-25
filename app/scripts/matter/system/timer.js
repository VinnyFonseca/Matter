// Timer

matter.timer = function(callback, delay) {
  var id, start, remaining = delay;

  this.stop = function() {
    window.clearTimeout(id);
    remaining = delay;
  };
  this.pause = function() {
    window.clearTimeout(id);
    remaining -= new Date() - start;
  };
  this.resume = function() {
    start = new Date();
    window.clearTimeout(id);
    id = window.setTimeout(callback, remaining);
  };
  this.resume();
}
