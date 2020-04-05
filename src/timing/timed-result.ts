export interface TimedResult<T>
{
	readonly result: T;
	readonly elapsedNanoseconds: bigint;
}