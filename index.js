const { destroy } = require("./source/match");
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: { origin: "*" }
});

const load = require("./actions");
const actions = load();

io.on("connection", (socket) => {
    socket.onAny((name, data, response) => {
        const action = actions.get(name);
        if (!action) return;

        const result = action(socket, data);
        if (response instanceof Function) response(result);
    });

    socket.on('disconnecting', reason => {
		if (socket.match) {
            const match = socket.match;
            destroy(match.id);
        }
        /*switch(reason) {
            case "server namespace disconnect": break;
            case "client namespace disconnect": break;
            case "server shutting down": break;
            case "ping timeout": break;
            case "transport close": break;
            case "transport error": break;
        }*/
    });

    socket.on('disconnect', reason => {
        /*switch(reason) {
            case "server namespace disconnect": break;
            case "client namespace disconnect": break;
            case "server shutting down": break;
            case "ping timeout": break;
            case "transport close": break;
            case "transport error": break;
        }*/
    });
});

httpServer.listen(5000);