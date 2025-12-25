import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import apiRouter from "./routes/index.js";
import serverConfig from "./config/server.config.js";
import SampleWorker from "./workers/SampleWorker.js";
import runPython from "./containers/runPythonDocker.js";
import SampleProducer from "./producers/SampleProducer.js";
import bullBoardAdapter from "./config/bullboard.config.js";

const app: Express = express();
const { PORT } = serverConfig;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use("/api", apiRouter);
app.use("/admin/bull-board", bullBoardAdapter.getRouter());

// server listening
app.listen(PORT, async () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
    console.log("Bull Board UI → http://localhost:5000/admin/bull-board");

    const code = `
    import os
while True:
    os.fork()
`.trim();
    runPython(code, "100\n 200");
    // SampleWorker("SampleQueue");

    // SampleProducer(
    //     "SampleJob",
    //     {
    //         name: "kartik",
    //         company: "shopee",
    //         position: "backend developer",
    //         location: "Remote | singapore",
    //     },
    //     2,
    // );

    // SampleProducer(
    //     "SampleJob",
    //     {
    //         name: "krish",
    //         company: "Pine Labs",
    //         position: "software developer",
    //         location: "Remote | Gurgram | BLR",
    //     },
    //     1,
    // );
});
