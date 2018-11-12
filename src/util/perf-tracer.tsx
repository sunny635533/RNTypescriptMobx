// A very simple way to record the running times of some codes.

import { autobind } from 'core-decorators';

export interface IPerfTracer {
  // enter(name: string): CallId;
  // leave(id: CallId): void;
  // shortSummary: string;
  enterAsync<A>(name: string, p: () => Promise<A>): Promise<A>;
  finishedCalls: Call[];
}

export function shortSummary(tracer: IPerfTracer): string {
  return tracer.finishedCalls.map(v => v.shortSummary).join('\n');
}

@autobind
export class PerfTracer implements IPerfTracer {
  private pending: CallMap = new Map();
  private finished: CallMap = new Map();
  private nextId = 1;

  enter(name: string): CallId {
    const id = this.nextId++;
    this.pending.set(id, new Call(name));
    return id;
  }

  leave(id: CallId) {
    const call = this.pending.get(id)!;
    this.pending.delete(id);
    this.finished.set(id, call.finish());
  }

  async enterAsync<A>(name: string, p: () => Promise<A>): Promise<A> {
    const id = this.enter(name);
    try {
      return await p();
    } finally {
      this.leave(id);
    }
  }

  get finishedCalls(): Call[] {
    const ids: number[] = [];
    for (let k of this.finished.keys()) {
      ids.push(k);
    }
    ids.sort();
    return ids.map(id => this.finished.get(id)!);
  }
}

export type CallId = number;
type CallMap = Map<CallId, Call>;

export class Call {
  start: Date = new Date;
  end: Date;

  constructor(public name: string) {
  }

  finish() {
    this.end = new Date;
    return this;
  }

  get duration(): number {
    return this.end.getTime() - this.start.getTime();
  }

  get shortSummary(): string {
    return `${this.name}: ${this.duration}`;
  }
}
