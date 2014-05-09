!function() {

	var timeout1, timeout2;

	var el = document.getElementById('async-button');

	function updateData() {
		if(timeout2) clearTimeout(timeout2);

		timeout2 = setTimeout(function() {
			debugger;
			// update the dom with data
		}, 500);
	}

	el.onclick = function(e) {
		if(timeout1) clearTimeout(timeout1);

		timeout1 = setTimeout(function() {

			$.ajax('../network/some-response.json').done(function() {
				updateData();
			});

		}, 500);
	}

}();