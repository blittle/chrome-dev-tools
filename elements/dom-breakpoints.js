!function() {
	var i = setInterval(function() {
		var el = document.getElementById("live-modify");
		if(!el) return clearInterval(i);

		var span = el.children[0];

		var num = (span.innerHTML * 1) + 1;

		el.removeChild(span);
		el.innerHTML = "<span>" + num + "</span>"
	}, 1000);
}()