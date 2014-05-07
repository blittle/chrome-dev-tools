Profiles
========

####Exercise
Each time you generate rows is pressed, the table will be cleared and 500 rows will be placed within it. Pressing it multiple times generates memory leaks. Use the profile tool to determine the location of the leak.
<button id="add1">Generate Rows</button>
<div style="max-height: 100px; overflow: auto;">
	<table id="table1"></table>
</div>

<script src="../profiles/memory-leak.js"></script>