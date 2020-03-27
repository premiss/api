import { emptyAsyncVoid, IsochrononFactory, Proof, Registrar, StepExecutorFactory } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExecutorFactory: StepExecutorFactory)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const isochronon = this.isochrononFactory.createIsochronon();
		const arrangeStepResult = await this.stepExecutorFactory.create(proof?.arrange).executeStep();
		let examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...arrangeStepResult };

		if (examResult.passed)
		{
			const actStepResult = await this.stepExecutorFactory.create(proof?.act || emptyAsyncVoid).executeStep();
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...actStepResult };
		}

		if (examResult.passed)
		{
			const assertStepResult = await this.stepExecutorFactory.create(proof?.assert || emptyAsyncVoid).executeStep();
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...assertStepResult };
		}

		await this.registrar.record(examResult);
	}
}