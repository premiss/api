export class Isochronon
{
	readonly #timing = process.hrtime.bigint();

	public getElapsedNanoseconds(): bigint
	{
		return process.hrtime.bigint() - this.#timing;
	}
}