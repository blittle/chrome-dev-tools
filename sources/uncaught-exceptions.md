Uncaught Exceptions
===================

Sometimes you may have a console error but have no idea where or how the exception was thrown. You can have the dev tools immediate break at uncaught or caught exceptions by clicking the <img src="../sources/break.png" style="display: inline;"/> icon. Use in conjunction with pretty-print in minfied apps.

![Audits](../sources/uncaught-exception.gif)

####Exercise‎
Reload the page. A error should be in the console. Use the uncaught exceptions to break at the error location and determine how to fix the problem.

<script></script>
<script></script>
<script>
	!function(e){var t=["hello","world"];var n={};n.helloWorld=function(){var e="";for(var n=0,r=t.length;n<=t.length;n++){e+=t[n].toUpperCase()}};n.helloWorld()}(this)
</script>