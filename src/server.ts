import staticServer from "node-static";
import http from "http";
import path from "path";
import { URL } from "url";

const file = new staticServer.Server(path.join(__dirname, "..", "public"), {
	cache: 0,
});

const PORT = 8080;
console.log(`Listening at http://localhost:${PORT}`);
http
	.createServer((req, res) => {
		const url = new URL(`http://localhost:${PORT}${req.url}`);
		if (url.pathname.startsWith("/preact")) {
			const mod = url.searchParams.get("module") || "";
			const props = Array.from(url.searchParams.entries()).reduce(
				(acc, part) => {
					const [key, value] = part;
					if (key === "module") return acc;
					// @ts-ignore
					acc[key] = value === "true";
					return acc;
				},
				{},
			);

			const [file, importId] = mod.split("#");

			// @ts-ignore
			import(`./client/${file}`).then(m => {
				const data = m[importId](props);

				let out = "";
				for (const k in data) {
					out += k + ": " + JSON.stringify(data[k]) + "\n";
				}

				res.end(out);
			});
		} else {
			file.serve(req, res);
		}
	})
	.listen(PORT);
