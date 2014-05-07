Asynchronous Stack Traces
=========================
Asynchronous stack traces allow you to inspect function calls beyond the current event loop. This is particularly useful because you can examine the scope of previously executed frames that are no longer on the event loop. This feature is currently an experiment and needs to be [enabled](../basics/settings.html).

![Audits](../sources/async.gif)

In the example above, notice the difference when asyncronous stack traces are enabled and disabled. Also note that the feature needs to be enabled **before** the breakpoint is reached.

[More about asynchronous stack traces](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)

<script src="../sources/async.js"></script>