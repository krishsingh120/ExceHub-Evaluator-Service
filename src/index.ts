import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

import apiRouter from "./routes/index.js";
import runCpp from "./containers/runCppDocker.js";
import runJava from "./containers/runJavaDocker.js";
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
    #include <bits/stdc++.h>
using namespace std;

int main() {
    int x;
    cin >> x;
    cout << "Value of x is : " << x << endl;

    for(int i = 0; i <= x; i++){
       cout << i << endl;
    }
    return 0;
}

    `.trim();

    // runPython(code, "100")
    // runJava(code, "10");
    runCpp(code, "10");

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
