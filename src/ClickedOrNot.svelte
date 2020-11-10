<script>
	let clicked;

	function enter() {
		clicked = true;
	}

	function leave() {
		clicked = false;
	}
</script>

<div on:mouseover={enter} on:mouseleave={leave}>
	<slot clicked={clicked}></slot>
</div>
