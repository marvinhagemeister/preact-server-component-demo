import { h } from "preact";
import { useState } from "preact/hooks";

export function Foo({ children }: any) {
	const [v, set] = useState(0);

	return (
		<div class="client-component">
			<h2 class="area-title">Child component</h2>
			<p>Passed Server content:{children}!!!</p>
			<p>Counter: {v}</p>
			<button onClick={() => set(v + 1)}>Update</button>
		</div>
	);
}
