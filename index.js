const http = require("http");
const url = require('url');
const { Server } = require('ws');

let readJSONBody = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => { body += chunk.toString(); });
            req.on("end", () => { resolve(body); });
        } catch (error) {
            reject(error);
        }
    });
}

const sendUnauthorized = (res) => {
    res.writeHead(403, { "Content-Type": "text/html" });
    res.end("Unauthorized.");
}

let app = http.createServer(async (req, res) => {
    const reqURL = url.parse(req.url, true);
    if (reqURL.pathname === "/") {
        if (req.method === "GET") {
            if (("hub.challenge" in reqURL.query) && ("hub.verify_token" in reqURL.query)) {
                if (reqURL.query["hub.verify_token"] == "abcdef") {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(reqURL.query["hub.challenge"]);
                } else {
                    sendUnauthorized(res);
                }
            } else {
                sendUnauthorized(res);
            }

            return;
        } else if (req.method === "POST") {
            if (!("x-hub-signature" in req.headers)) {
                sendUnauthorized(res);
                return;
            }

            if (req.readable) {
                const rawJSONString = await readJSONBody(req);
                const jsonData = JSON.parse(rawJSONString);

                console.log(jsonData);
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("awts gege");
        }
    }
});

let port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

const wss = new Server({ server: app });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => console.log('Client disconnected'));
    ws.on('message', (data, isBinary) => {
        let msg = data.toString();

        // if (!msg.includes('{')) { return; }
        // let msgObj = JSON.parse(msg);
        // console.log(msgObj);

        // if (!msgObj.action) { return; }
        wss.clients.forEach((client) => {
            client.send(msg);
        });

        if (!msg.includes('{')) { return; }
        let msgObj = JSON.parse(msg);
        console.log(msgObj.entry[0].messaging[0]);
    });
});