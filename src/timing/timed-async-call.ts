import { TimedResult } from "../";

export const timedAsyncCall = async function <T>(timedCall: () => Promise<T>): Promise<TimedResult<T>>
{
	const start = process.hrtime.bigint();
	const result = await timedCall();
	return { elapsedNanoseconds: process.hrtime.bigint() - start, result };
};