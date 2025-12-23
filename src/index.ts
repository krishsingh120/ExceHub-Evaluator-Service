import express, { Express, Request, Response } from "express";

import serverConfig from "./config/server.config.js";
import apiRouter from "./routes/index.js";
import SampleProducer from "./producers/SampleProducer.js";
import SampleWorker from "./workers/SampleWorker.js";
import bullBoardAdapter from "./config/bullboard.config.js";

const app: Express = express();
const { PORT } = serverConfig;

app.use(express.json());
app.use("/api", apiRouter);
app.use("/admin/bull-board", bullBoardAdapter.getRouter());

app.listen(PORT, () => {
    console.log(`Server is listening on port: http://localhost:${PORT}`);
    console.log("Bull Board UI → http://localhost:5000/admin/bull-board");

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
