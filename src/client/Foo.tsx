import { h } from "preact";

export function Foo({ children }: any) {
	return (
		<div class="client-component">
			<h2>Child component</h2>
			<p>...with server content: </p>
			<p>{children}!!!</p>
		</div>
	);
}
