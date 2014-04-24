!function() {
	var table1 = document.getElementById("table1"),
		table2 = document.getElementById("table2");

	document.getElementById("add1").onclick = function() {
		console.time("table1");
		table1.innerHTML = "";
		var count = 4000;

		while(count--) {
			var tr = document.createElement("tr");

			table1.appendChild(tr);

			var td = document.createElement("td");
			var text = document.createTextNode("Row " + count);

			td.appendChild(text);
			tr.appendChild(td); 
		}

		console.timeEnd("table1");
	}

	document.getElementById("add2").onclick = function() {
		console.time("table2");
		var count = 4000;
		var tbody = document.createElement('tbody');

		while(count--) {
			var tr = document.createElement("tr");

			tbody.appendChild(tr);

			var td = document.createElement("td");
			var text = document.createTextNode("Row " + count);

			td.appendChild(text);
			tr.appendChild(td); 
		}

		table2.appendChild(tbody);

		console.timeEnd("table2");
	}
}()