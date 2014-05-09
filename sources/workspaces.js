!function() {
	var app = {};

	app.start = function() {
		setTimeout(function() {
			console.log('app started');
		});
	}
	
	alert('hello again');

	app.start();
}()