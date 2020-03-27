import { IsochrononFactory, Proof, Registrar } from "./";

export class Examiner
{
	private readonly emptyStep = async (): Promise<void> =>
	{
		// empty
	};

	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const isochronon = this.isochrononFactory.createIsochronon();
		const arrangeStepResult = await Examiner.executeStep(proof?.arrange || this.emptyStep);
		let examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...arrangeStepResult };

		if (examResult.passed)
		{
			const actStepResult = await Examiner.executeStep(proof?.act || this.emptyStep);
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

interface StepResult
{
	passed: boolean;
	error: Error | undefined;
}