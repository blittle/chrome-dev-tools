!function(glob) {
	glob.reqs = {};
	reqs.makeRequestAsync = function() {
		setTimeout(function() {
			jQuery.ajax({
				url: '/network/some-response.json',
				type: 'GET',
				contentType: 'application/json'
			});
		});
	}
}(this);