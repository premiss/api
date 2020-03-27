import { emptyAsyncVoid, IsochrononFactory, Proof, Registrar, StepResult } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const isochronon = this.isochrononFactory.createIsochronon();
		const arrangeStepResult = await Examiner.executeStep(proof?.arrange || emptyAsyncVoid);
		let examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...arrangeStepResult };

		if (examResult.passed)
		{
			const actStepResult = await Examiner.executeStep(proof?.act || emptyAsyncVoid);
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...actStepResult };
		}

		if (examResult.passed)
		{
			const assertStepResult = await Examiner.executeStep(proof.assert);
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...assertStepResult };
		}

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

