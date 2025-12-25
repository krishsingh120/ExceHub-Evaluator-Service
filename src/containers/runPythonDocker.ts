import Docker from "dockerode";

import createPythonContainer from "./containerFactory.js";
import { TestCases } from "../types/testCases.js";
import { PYTHON_IMAGE } from "../utils/constants.js";
import decodeDockerStream, { escapeForShell } from "./dockerHelper.js";

async function runPython(code: string, inputTestCase: string) {
    console.log(`Initializing python docker container`);

    const safeCode = escapeForShell(code);
    let rawLogBuffer: Buffer[] = [];

    let runCommand = `echo "${safeCode}" > test.py && echo "${inputTestCase}" | python3 test.py`;

    // const pythonDockerContainer = await createPythonContainer(PYTHON_IMAGE, ["python3","-c",code]);
    const pythonDockerContainer = await createPythonContainer(PYTHON_IMAGE, [
        "/bin/sh",
        "-c",
        runCommand,
    ]);

    await pythonDockerContainer.start();

    console.log("start the docker container");

    const loggerStream = await pythonDockerContainer.logs({
        stdout: true,
        stderr: true,
        timestamps: false,
        follow: true, // Weather logs are streamed and returned as a string.
    });

    // attach events on the stream objects to start and stop reading.
    // typeof every chunk is in form of byte.
    // every chunk consist of header -> stdout/stderr
    loggerStream.on("data", (chunk) => {
        rawLogBuffer.push(chunk);
    });

    loggerStream.on("end", () => {
        console.log(rawLogBuffer);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        console.log(decodedStream);
    });
}

export default runPython;
