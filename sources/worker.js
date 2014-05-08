function add(a, b) {
	return (a * 1) + (b * 1);
}

self.addEventListener('message', function(e) {
  setTimeout(function() {
    self.postMessage(
      add(e.data.val1, e.data.val2)
    );
  }, 500);
}, false);