import {
	Router as SolidRouter,
	Routes,
	Route,
	Link,
	useRoutes,
} from "solid-app-router";
import { Component } from "solid-js";

// ____ TYPES ____

// ____ GLOB IMPORTS ____
// > glob import all special pages
const PRESERVED = import.meta.globEager("/src/pages/**/(__layout|404).tsx");
// > glob import all routes
const ROUTES = import.meta.globEager("/src/pages/**/[a-z[]*.tsx");
// > glob import __app
const APP = import.meta.globEager("/src/pages/__app.tsx");
console.log({ APP });

// ____ GLOB TRANSFORMS ____
// > transform layout pages into object array
const layouts = Object.keys(PRESERVED)
	.filter((key) => key.includes("__layout"))
	.map((route) => {
		const path =
			route
				.replace(/\/src\/pages|index|\.tsx$/g, "")
				.replace(/\[\.{3}.+\]/, "*")
				.replace(/\[(.+)\]/, ":$1")
				.replace("__layout", "") + "*";

		console.log({ route, path, component: PRESERVED[route].default });

		return { path, component: PRESERVED[route].default };
	})
	.sort((a, b) => b.path.split("/").length - a.path.split("/").length);

// > transform 404 pages into object array
const fourOhFours = Object.keys(PRESERVED)
	.filter((key) => key.includes("404"))
	.map((route) => {
		const path = route
			.replace(/\/src\/pages|index|\.tsx$/g, "")
			.replace(/\[\.{3}.+\]/, "*")
			.replace(/\[(.+)\]/, ":$1")
			.replace("404", "");

		console.log({ route, path });

		return { path: path, component: PRESERVED[route].default };
	})
	.sort((a, b) => b.path.split("/").length - a.path.split("/").length);

// > transform routes into object array
const routes = Object.keys(ROUTES).map((route) => {
	const path = route
		.replace(/\/src\/pages|index|\.tsx$/g, "")
		.replace(/\[\.{3}.+\]/, "*")
		.replace(/\[(.+)\]/, ":$1");

	return { path, component: ROUTES[route].default };
});

console.log({
	routes,
});

// > transform app into component or fragment
const App =
	APP?.["/src/pages/__app.tsx"]?.default ??
	((({ children }) => <>{children}</>) as Component);
console.log({ App, APP });
// ____ COMPONENTS ____
const Layout: Component = ({ children }) => {
	console.log({
		layouts,
	});
	const Routes = useRoutes(
		layouts.map((layout) => {
			console.log({ layout });
			const Component = layout.component;
			return {
				...layout,
				component: () => <Component>{children}</Component>,
			};
		}),
	);
	return (
		<>
			<Routes />
		</>
	);
};

const NotFound: Component = () => {
	return (
		<Route path="*">
			<Routes>
				{fourOhFours.map(({ path, component: Component = <></> }) => (
					<Route path={path} element={<Component />} />
				))}
			</Routes>
		</Route>
	);
};

export const Router: Component = () => {
	const Routes = useRoutes(routes);
	return (
		<SolidRouter>
			<Layout>
				<App>
					<Routes />
				</App>
			</Layout>
		</SolidRouter>
	);
};
