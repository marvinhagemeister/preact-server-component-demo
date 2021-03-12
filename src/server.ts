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
    if (req.url?.startsWith('/preact')) {
      const queryParams = req.url.split('?')[1];
      const parts = queryParams.split('&');
      const mod = parts.find(x => x.split('=')[0] === 'module');
      const props = parts.reduce((acc, part) => {
        const [key, value] = part.split('=');
        if (key === 'module') return acc;
        // @ts-ignore
        acc[key] = value;
        return acc;
      }, {})
      // @ts-ignore
      import(`./client/${mod?.split('#')[0]}`).then(m => {
        res.end(JSON.stringify(m[m.split('#')[1]](props)))
      })
    }

    file.serve(req, res);
	})
	.listen(PORT);
