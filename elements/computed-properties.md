Computed Properties
===================

Sometimes CSS properties are dynamically computed based upon the context of the style. For example an property value with an `em` unit is proportional to the parent element.

![alt text](/elements/computed-properties.png "Less")

<br/>
Inspect the element below and analyze the defined versus computed properties:

<div id="computed-prop-container">
	<p class="content">
		Here is some calculated content
	</p>
</div>

<style>
	#computed-prop-container {
		font-size: 15px;
		width: 500px;
		box-sizing: border-box;
	}

	#computed-prop-container .content {
		font-size: 1.5em;
		margin: 0 3em 3em 3em;
		border: .1em solid black;
		padding: 1em;
		width: calc(100% - 68px);
		box-sizing: border-box;
	}
</style>
