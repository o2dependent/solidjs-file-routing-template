import { Link } from "solid-app-router";
import type { Component } from "solid-js";
import styles from "./__app.module.css";

const __app: Component = ({ children }) => {
	return <div class={styles.__app}>{children}</div>;
};

export default __app;
