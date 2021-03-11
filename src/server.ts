import staticServer from "node-static";
import http from "http";
import path from "path";

const file = new staticServer.Server(path.join(__dirname, "..", "public"), {
	cache: 0,
});

const PORT = 8080;
console.log(`Listening at http://localhost:${PORT}`);
http
	.createServer((req, res) => {
		file.serve(req, res);
	})
	.listen(PORT);
