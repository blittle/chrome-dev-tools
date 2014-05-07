!function() {
	var app = {};

	app.start = function() {
		setTimeout(function() {
			console.log('app started');
		});
	}

	app.start();
}()