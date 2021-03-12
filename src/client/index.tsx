import { render, h } from "preact";
import { useState } from "preact/hooks";
import { FakeRoot, FakeRootProvider } from "./FakeRoots";

/** @jsx h */

const App = () => {
	const [state, setState] = useState(false);
	return (
		<main>
			<FakeRootProvider>
				<h1>
					<span class="atom">⚛</span> Preact Server Components
				</h1>
				<p>
					This demo demonstrates how components are rendered on the server and
					inserted on the client.
				</p>
				<button id="toggle" onClick={() => setState(!state)}>
					Fetch data
				</button>
				<br />
				<div class="area">
					<div class="server-component">
						<h2 class="area-title">Server Component A</h2>
						<FakeRoot
							hash="data.server.js#ServerComponent"
							name="J0"
							state={state}
						/>
					</div>
					<div class="server-component">
						<h2 class="area-title">Server Component B</h2>
						<FakeRoot
							hash="data.server.js#ServerComponent2"
							name="J1"
							state={state}
						/>
					</div>
				</div>
				<div class="area-full">
					<FakeRoot
						hash="data.server.js#ServerComponent3"
						name="J2"
						state={state}
					/>
				</div>
				<br />
			</FakeRootProvider>
		</main>
	);
};

render(<App />, document.getElementById("app")!);
