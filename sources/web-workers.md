Web Workers
===========
[HTML5 provides an API](http://www.html5rocks.com/en/tutorials/workers/basics/) for spawning background scripts that can run concurrently with the primary JavaScript execution thread. Chrome developer tools provide a convenient way for debugging these background workers (threads). Each separate worker has its own dedicated inspector listed as a link. Clicking on one of the worker inspectors will boot a new instance of the chrome dev tools specific for that background thread. Optionally you can also have workers break automatically when they first boot.

<img src="../sources/workers.png"/>

####Exersize
A worker has been started in the background that accepts two numbers, adds them, and returns the result. Pass data to the worker thread and use the chrome developer tools to debug the output.

<div>
	<input id="val1"/><span>+</span><input id="val2"/><span>=</span><span id="result"></span>
	<button id="calculate">Calculate</button>
</div>

<script>
	!function() {
		var worker = new Worker('worker.js');

		var field1 = document.getElementById('val1');
		var field2 = document.getElementById('val2');
		var result = document.getElementById('result');

		document.getElementById('calculate').onclick = function(e) {
			worker.postMessage({
				val1: field1.value,
				val2: field2.value
			});
		}

		worker.addEventListener('message', function(e) {
			result.innerHTML = e.data;
		}, false);
	}();
</script>