export interface TimedResult<T>
{
	readonly result: T;
	readonly elapsedNanoSeconds: bigint;
}