import { BATCH_DEBOUNCE_DURATION_IN_MS } from "../constants";

class DebouncedSupabaseQuery<T, U> {
  private queries: number[] = [];
  private timeout: NodeJS.Timeout | null = null;
  private executeQuery: (queries: number[]) => Promise<U>;
  private resolvers: ((value: T) => void)[] = [];
  private processResults: (query: number, results: U) => T;

  constructor(
    executeQuery: (queries: number[]) => Promise<U>,
    processResults: (query: number, results: U) => T,
  ) {
    this.executeQuery = executeQuery;
    this.processResults = processResults;
  }

  private async execute() {
    const queries = this.queries;
    const resolvers = this.resolvers;
    this.queries = [];
    this.resolvers = [];

    const results = await this.executeQuery(queries);

    for (let i = 0; i < queries.length; i++) {
      resolvers[i](this.processResults(queries[i], results));
    }
  }

  public async query(value: number): Promise<T> {
    this.queries.push(value);

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(
      () => this.execute(),
      BATCH_DEBOUNCE_DURATION_IN_MS,
    );

    const p = new Promise<T>((resolve) => {
      this.resolvers.push(resolve);
    });
    return p;
  }
}

export default DebouncedSupabaseQuery;
