// Popup

matter.popup = function(url, title, w, h) {
  var t = (screen.height / 2) - (h / 2),
      l = (screen.width / 2) - (w / 2);

  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + t + ', left=' + l);
}
