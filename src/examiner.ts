import { emptyAsyncVoid, IsochrononFactory, Proof, Registrar, StepExecutor } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExecutor: StepExecutor)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const isochronon = this.isochrononFactory.createIsochronon();
		const arrangeStepResult = await this.stepExecutor.executeStep(proof?.arrange || emptyAsyncVoid);
		let examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...arrangeStepResult };

		if (examResult.passed)
		{
			const actStepResult = await this.stepExecutor.executeStep(proof?.act || emptyAsyncVoid);
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...actStepResult };
		}

		if (examResult.passed)
		{
			const assertStepResult = await this.stepExecutor.executeStep(proof?.assert || emptyAsyncVoid);
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...assertStepResult };
		}

		await this.registrar.record(examResult);
	}
}