import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

// import YOUR queue
import SampleQueue from "../queues/SampleQueue.js";

const serverAdapter = new ExpressAdapter();

// URL where Bull Board will be available
serverAdapter.setBasePath("/admin/bull-board");

createBullBoard({
  queues: [
    new BullMQAdapter(SampleQueue),
  ],
  serverAdapter,
});

export default serverAdapter;
