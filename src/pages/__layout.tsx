import { Link } from "solid-app-router";
import { Component, createSignal } from "solid-js";

const __layout: Component = ({ children }) => {
	const [count, setCount] = createSignal(0);
	return (
		<div>
			<header>
				<h1 onClick={() => setCount(count() + 1)}>
					{count()} Index Layout Header
				</h1>
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
				<Link href="/todo">Todo</Link>
			</header>
			<main>{children}</main>
			<footer>
				<h2>Layout Footer</h2>
			</footer>
		</div>
	);
};

export default __layout;
