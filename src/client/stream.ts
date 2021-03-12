import { h, render, ComponentChildren } from "preact";
import { jsx } from "preact/jsx-runtime";

type StreamedProps = Record<string, any> & {
	children: StreamedChild | StreamedChild[];
};
type StreamedChild =
	| string
	| number
	| null
	| ["$", string, null | string | number, StreamedProps];

type StreamedVNode = StreamedChild | StreamedChild[];

export interface StreamedModule {
	id: string;
}

type Registry = Map<string, Record<string, any>>;

function toVNode(registry: Registry, input: StreamedVNode): ComponentChildren {
	if (Array.isArray(input) && input.length > 0) {
		if (Array.isArray(input[0])) {
			return input.map((v: any) => toVNode(registry, v));
		} else if (input[0] === "$") {
			let type = input[1] as string;

			// Reference type
			if (type[0] === "@") {
				const [name, importId] = type.slice(1).split("#");
				const mod = registry.get(name);

				if (!mod) {
					throw new Error(`Module "${name}" not found in local registry.`);
				}

				const c = mod[importId];
				if (!c) {
					throw new Error(
						`Export "${importId}" not found in module "${name}".`,
					);
				}

				type = c;
			}

			const key = input[2] as any;
			const props = { ...(input[3] as any) };
			if ("children" in props) {
				props.children = toVNode(registry, props.children);
			}
			return jsx(type, props, key);
		}
	}

	return input;
}

export async function parse(input: string) {
	const commands = input.split("\n").filter(Boolean);

	// TODO: Consider making this global
	const registry: Registry = new Map();

	// TODO: Add support for adding script tags
	for (const cmd of commands) {
		const idx = cmd.indexOf(":");
		const type = cmd.slice(0, idx);
		const raw = cmd.slice(idx + 1);
		const data = JSON.parse(raw);

		switch (cmd[0]) {
			case "M": {
				const d = data as StreamedModule;
				console.log(d);
				try {
					// @ts-ignore
					const m = await import(d.id);
					registry.set(type, m);
				} catch (err) {
					throw err;
				}
				break;
			}
			case "J": {
				const d = data as StreamedVNode;
				const vnode = toVNode(registry, d);
				const rootId = cmd.slice(0, idx);
				const selector = `[data-root="${rootId}"]`;
				const root = document.querySelector(selector);

				if (!root) {
					throw new Error(`No element found with selector ${selector}`);
				}

				render(vnode, root);
				break;
			}
			default:
				throw new Error(`Unknown type: ${cmd}`);
		}
	}
}
