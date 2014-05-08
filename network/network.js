setTimeout(function() {
	jQuery.ajax({
		url: '/network/some-response.json',
		type: 'GET',
		contentType: 'application/json',
		success: function(resp) {
			var el = document.getElementById('server-response');
			if(el) el.innerHTML = JSON.stringify(resp);
		}
	})
}, 1000)