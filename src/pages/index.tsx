import { Component, createSignal } from "solid-js";

const index: Component = () => {
	const [count, setCount] = createSignal(0);

	return (
		<div>
			<button onClick={() => setCount(count() + 1)}>{count()}</button>
			<h1>Hello world</h1>
		</div>
	);
};

export default index;
