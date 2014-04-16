Network
=======

The network tab is very useful for inspecting network requests. Note: the developer tools need to be open for requests to be logged.

  * The red button at the top left enables and disables the logging of requests (defaults on).
  * The filter icon allows you to filter request by type and by key words.
  * Mouse over individual requests on the timeline column to view timing information.
  * The initiator column has a link to the file and line number from where the request was initiated.

![alt text](/network/network.png "Less")


####Use the network tab in the developer tools to find in the source where an AJAX request is made to `some-response.json`

####Server Response:
<div id='server-response'></div>

<script>
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
</script>