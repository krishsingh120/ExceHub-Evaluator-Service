import SampleQueue from "../queues/SampleQueue";

export default async function (name: string, payload: Record<string, unknown>, priority: number) {
    // QueueName.add(jobName, {})
    await SampleQueue.add(name, payload, { priority });
    console.log("Successfully Added a new job");
}
