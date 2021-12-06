import { Link } from "solid-app-router";
import type { Component } from "solid-js";

const __layout: Component = ({ children }) => {
	return (
		<div>
			<header>
				<h1>Todo</h1>
				<Link href="/">Home</Link>
				<Link href="/about">About</Link>
				<Link href="/todo">Todo</Link>
				<Link href="/todo/about">Todo</Link>
			</header>
			<main>{children}</main>
		</div>
	);
};

export default __layout;
