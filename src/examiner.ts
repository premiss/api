import { emptyAsyncVoid, IsochrononFactory, Proof, Registrar, StepExecutor, StepExecutorFactory, StepResult } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExecutorFactory: StepExecutorFactory)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const isochronon = this.isochrononFactory.createIsochronon();
		const arrangeStepResult = await this.getStepResult(this.stepExecutorFactory.create(proof?.arrange));
		let examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...arrangeStepResult };

		if (examResult.passed)
		{
			const actStepResult = await this.getStepResult(this.stepExecutorFactory.create(proof?.act || emptyAsyncVoid));
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...actStepResult };
		}

		if (examResult.passed)
		{
			const assertStepResult = await this.getStepResult(this.stepExecutorFactory.create(proof?.assert || emptyAsyncVoid));
			examResult = { elapsedNanoseconds: isochronon.getElapsedNanoseconds(), ...assertStepResult };
		}

		await this.registrar.record(examResult);
	}

	private async getStepResult(stepExecutor: Readonly<StepExecutor>): Promise<StepResult>
	{
		return new Promise<StepResult>(resolve =>
		{
			stepExecutor.executeStep((stepResult: StepResult): void =>
			{
				resolve(stepResult);
			});
		});
	}
}

