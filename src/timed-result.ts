export interface TimedResult<T>
{
	readonly result: Readonly<T>;
	readonly elapsedNanoSeconds: bigint;
}