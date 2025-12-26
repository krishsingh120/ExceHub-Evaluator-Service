import Docker from "dockerode";

import createJavaContainer from "./containerFactory.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import decodeDockerStream, { escapeForShell } from "./dockerHelper.js";
import pullImage from "./pullImage.js";

async function runJava(code: string, inputTestCase: string) {
    console.log(`Initializing java docker container`);

    await pullImage(JAVA_IMAGE);

    const safeCode = escapeForShell(code);
    let rawLogBuffer: Buffer[] = [];

    let runCommand = `echo "${safeCode}" > Main.java && javac Main.java && echo "${inputTestCase}" | java Main`;

    // const pythonDockerContainer = await createPythonContainer(PYTHON_IMAGE, ["python3","-c",code]);
    const javaDockerContainer = await createJavaContainer(JAVA_IMAGE, [
        "/bin/sh",
        "-c",
        runCommand,
    ]);

    await javaDockerContainer.start();

    console.log("start the docker container");

    const loggerStream = await javaDockerContainer.logs({
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

    const response = await new Promise((res) => {
        loggerStream.on("end", () => {
            console.log(rawLogBuffer);
            const completeBuffer = Buffer.concat(rawLogBuffer);
            const decodedStream = decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);
        });
    });

    // remove the container when done with it.
    await javaDockerContainer.remove();
    return response;
}

export default runJava;
