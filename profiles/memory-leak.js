!function() {
	var rowCache = {};
	var idCounter = 0;
	var table1 = document.getElementById("table1");

	function buildRows(el) {
		el.innerHTML = "";
		var count = 100;

		var tbody = document.createElement('tbody');

		while(count--) {
			var id = "tr-" + idCounter++;
			var tr = document.createElement("tr");
			rowCache[id] = tr;

			tbody.appendChild(tr);

			var td = document.createElement("td");
			var text = document.createTextNode("Row " + count);

			td.appendChild(text);
			tr.appendChild(td); 
		}

		el.appendChild(tbody);
	}

	document.getElementById("add1").onclick = function() {
		buildRows(table1);
	}
}();