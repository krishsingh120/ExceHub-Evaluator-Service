import { Job } from "bullmq";
import { IJob } from "../types/bullMqJobDefinition.js";
import { submissionPayload } from "../types/submissionPayload.js";
import runCpp from "../containers/runCppDocker.js";
import runJava from "../containers/runJavaDocker.js";
import runPython from "../containers/runPythonDocker.js";

export default class SubmissionJob implements IJob {
    name: string;
    payload: Record<string, submissionPayload>;

    constructor(payload: Record<string, submissionPayload>) {
        this.name = this.constructor.name;
        this.payload = payload;
    }

    handle = async (job?: Job): Promise<void> => {
        console.log("Handler of the job called");
        console.log(this.payload);

        if (job) {
            const key = Object.keys(this.payload)[0];

            // console.log(this.payload[key].language);

            const { code, language, inputCase } = this.payload[key];

            if (language === "CPP") {
                const response = await runCpp(code, inputCase);
                console.log("Evaluated response is: ", response);
            } else if (language === "JAVA") {
                const response = await runJava(code, inputCase);
                console.log("Evaluated response is: ", response);
            } else if (language === "PYTHON") {
                const response = await runPython(code, inputCase);
                console.log("Evaluated response is: ", response);
            }
        }
    };

    failed = async (job?: Job): Promise<void> => {
        console.log("Job failed");
        if (job) {
            console.log("Job ID:", job.id);
        }
    };
}
