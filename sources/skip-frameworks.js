!function() {
	var app = {};

	app.helloWorld = function() {

		debugger;
		var val = _.reduce("Hello World!", function(str, c) {
			return str += c.toUpperCase();
		}, "");

		console.log(val);
	}

	app.helloWorld();
}()