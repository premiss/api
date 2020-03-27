export class Isochronon
{
	private readonly timing = process.hrtime.bigint();

	public getElapsedNanoseconds(): bigint
	{
		return process.hrtime.bigint() - this.timing;
	}
}