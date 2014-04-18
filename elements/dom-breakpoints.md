DOM Breakpoints
===============

DOM Breakpoints are useful to break on DOM mutation events, such as when a node is removed, modified, or its attributes are changed.
You can view all current DOM breakpoints on the `DOM Breakpoint` tab.

<img src="../elements/breakpoint.png"/>

####Find which script is modifying the following element by using DOM Breakpoints:

<div id="live-modify">
	<span>0</span>
</div>

<script>
	var i = setInterval(function() {
		var el = document.getElementById("live-modify");
		if(!el) return clearInterval(i);

		var span = el.children[0];

		var num = (span.innerHTML * 1) + 1;

		el.removeChild(span);
		el.innerHTML = "<span>" + num + "</span>"
	}, 1000);
</script>