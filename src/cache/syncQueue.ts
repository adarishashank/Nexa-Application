import { CollectionName } from "./cacheDatabase";

export interface SyncJob {
  collection: CollectionName;
  recordId: string;
  attempts: number;
}

export class SyncQueue {
  private queue: SyncJob[] = [];

  enqueue(job: SyncJob): void {
    this.queue.push({ ...job, attempts: job.attempts ?? 0 });
  }

  dequeue(): SyncJob | undefined {
    return this.queue.shift();
  }

  peek(): SyncJob | undefined {
    return this.queue[0];
  }

  size(): number {
    return this.queue.length;
  }

  retry(job: SyncJob): void {
    this.queue.push({ ...job, attempts: job.attempts + 1 });
  }
}
