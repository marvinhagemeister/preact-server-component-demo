import { parse } from "./stream";

// Dummy UI to trigger fetches
let state = false;
const btn = document.querySelector("#toggle");
btn?.addEventListener("click", async () => {
	state = !state;
	const res = await fetch(state ? "/api1.txt" : "/api2.txt");

	const data = await res.text();
	parse(data);
});
