import { IsochrononFactory, Proof, Registrar } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const isochronon = this.isochrononFactory.createIsochronon();
		const assertStepResult = await Examiner.executeStep(proof.assert);
		const examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...assertStepResult };
		await this.registrar.record(examResult);
	}

	private static async executeStep(step: () => Promise<void>): Promise<StepResult>
	{
		try
		{
			await step();
			return { passed: true, error: undefined };
		}
		catch (error)
		{
			return { passed: false, error: error };
		}
	}
}

interface StepResult
{
	passed: boolean;
	error: Error | undefined;
}