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

function toVNode(input: StreamedVNode): ComponentChildren {
	if (Array.isArray(input) && input.length > 0) {
		if (Array.isArray(input[0])) {
			return input.map((v: any) => toVNode(v));
		} else if (input[0] === "$") {
			const type = input[1] as string;
			const key = input[2] as any;
			const props = { ...(input[3] as any) };
			if ("children" in props) {
				props.children = toVNode(props.children);
			}
			return jsx(type, props, key);
		}
	}

	return input;
}

export function parse(input: string) {
	const commands = input.split("\n").filter(Boolean);

	// TODO: Add support for adding script tags
	commands.forEach(cmd => {
		const idx = cmd.indexOf(":");
		const raw = cmd.slice(idx + 1);
		const data = JSON.parse(raw) as StreamedVNode;

		switch (cmd[0]) {
			case "J": {
				const vnode = toVNode(data);
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
	});
}
