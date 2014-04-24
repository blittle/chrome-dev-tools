Commands
========

The console provides the following useful commands:
  * `assert` - A simple assertion API to verify functionality
  * `time` and `timeEnd` - Measure how long something takes
  * `timeStamp` - Programatically mark the timeline.
  * `debugger` - Force the debugger to break
  * `profile` and `profileEnd` - Programatically start and stop a CPU profile

```javascript
console.assert($('#my-component').length, "My component exists on the page");

console.time("ajax request");
$.get('/some/url', function() {
	// Will print to the screen the 
	// elapsed time between start and end
	console.timeEnd("ajax request");
});

function removeCalendar() {
	console.timeStamp("removing calendar");
	calendarElement.remove();
	calendarDisplayed = false;
}
```