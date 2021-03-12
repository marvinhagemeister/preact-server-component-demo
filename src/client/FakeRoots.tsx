import { h, createContext, ComponentChildren, Fragment } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { parse } from "./stream";

/** @jsx h */

export interface RootContextData {
	roots: Map<string, (children: ComponentChildren) => void>;
}

export const FakeRootContext = createContext<RootContextData>({
	roots: new Map(),
});

export function FakeRootProvider({ children }: any) {
	const ref = useRef<RootContextData>({ roots: new Map() });

	return (
		// @ts-ignore
		<FakeRootContext.Provider value={ref.current}>
			{children}
		</FakeRootContext.Provider>
	);
}

export function FakeRoot({
	name,
	hash,
	state,
}: {
	name: string;
	hash: string;
	state: any;
}) {
	const ctx = useContext(FakeRootContext);
	const [v, set] = useState<ComponentChildren>(null);

	useEffect(() => {
		ctx.roots.set(name, set);
		fetch(
			`/preact?module=${encodeURIComponent(hash)}&state=${encodeURIComponent(
				state,
			)}`,
		)
			.then(d => d.text())
			.then(d => parse(ctx.roots, d));
	}, [state, ctx]);

	return <Fragment>{v || null}</Fragment>;
}
