Timeline
========

####Exercise
Each button below will append 4000 rows to a table. The first is almost 10 times slower than the second. Use the timeline to help determine where what causes the performance hit.
#####Generate Elements 1
<button id="add1">Add Elements</button>
<div style="max-height: 100px; overflow: auto;">
	<table id="table1"></table>
</div>

#####Generate Elements 2
<button id="add2">Add Elements</button>
<div style="max-height: 100px; overflow: auto;">
	<table id="table2"></table>
</div>

<script src="../timeline/table-perf.js"></script>