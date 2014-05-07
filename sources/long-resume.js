!function() {
	var app = {};
	debugger;

	app.start = function() {
		setTimeout(function() {
			debugger;
			console.log('app started');
		});
	}

	app.start();
}()