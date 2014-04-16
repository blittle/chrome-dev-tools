WebSockets
==========

Chrome developer tools contain a websockets view for analyzing websocket message frames.

  * Green messages represent client to server (upload) messages while white represent server to client (download).
  * The frames do not automatically update. Click on the request within the name column to refresh the frames.
  * Right click to copy the data out of the frames.

![alt text](/network/web-socket.png "Less")



####Inspect the frames sent within the following websocket connection:

Message: <input id="socket-message"/><button id="send-socket">Send Message</button>
<div id="output"></div>

<script language="javascript" type="text/javascript">  
	!function() {
		var wsUri = "ws://echo.websocket.org/"; 
		var output; 

		document.getElementById('send-socket').onclick = function() {
			var el = document.getElementById('socket-message');
			doSend(el.value); 
			el.value = "";
		}

		function init() { 
			output = document.getElementById("output"); 
			testWebSocket(); 
		}  

		function testWebSocket() { 
			websocket = new WebSocket(wsUri); 

			websocket.onopen = function(evt) { 
				onOpen(evt) 
				doSend("some value");
			}; 

			websocket.onclose = function(evt) { 
				onClose(evt) 
			}; 

			websocket.onmessage = function(evt) { 
				onMessage(evt) 
			}; 

			websocket.onerror = function(evt) { 
				onError(evt) 
			}; 
		}  

		function onOpen(evt) { 
			writeToScreen("CONNECTED"); 
		}  

		function onClose(evt) { 
			writeToScreen("DISCONNECTED"); 
		}  

		function onMessage(evt) { 
			writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'); 
		}  

		function onError(evt) { 
			writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
		}  

		function doSend(message) { 
			writeToScreen("SENT: " + message);  websocket.send(message); 
		}  

		function writeToScreen(message) { 
			var pre = document.createElement("p"); 
			pre.style.wordWrap = "break-word"; 
			pre.innerHTML = message; output.appendChild(pre); 
		}  

		init();
	}();
</script>  