import { Proof, Registrar } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		try
		{
			await proof.assert();
			await this.registrar.record({passed: true});
		}
		catch
		{
			await this.registrar.record({passed: false});
		}
	}
}

