import { emptyAsyncVoid, ExamResult, Isochronon, IsochrononFactory, Proof, ProofStepSignature, Registrar, StepExecutor, StepExecutorFactory, StepResult } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExecutorFactory: StepExecutorFactory)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const examResult = await this.executeSteps(proof);
		await this.registrar.record(examResult);
	}

	private async executeSteps(proof: Readonly<Proof>): Promise<ExamResult>
	{
		const examResult: ExamResult = { elapsedNanoseconds: BigInt(0), passed: true, error: undefined };
		const assertExecute = this.createStepExecution(proof.assert, examResult, emptyAsyncVoid);
		const actExecute = this.createStepExecution(proof.act || emptyAsyncVoid, examResult, assertExecute);
		const arrangeExecute = this.createStepExecution(proof.arrange || emptyAsyncVoid, examResult, actExecute);
		await arrangeExecute(this.isochrononFactory.createIsochronon());
		return examResult;
	}

	private createStepExecution(proofStepSignature: ProofStepSignature, examResult: ExamResult, next: (isochronon: Readonly<Isochronon>) => Promise<void>): (isochronon: Readonly<Isochronon>) => Promise<void>
	{
		return async (isochronon: Readonly<Isochronon>): Promise<void> =>
		{
			const stepResult = await this.getStepResult(this.stepExecutorFactory.create(proofStepSignature));
			examResult.elapsedNanoseconds = isochronon.getElapsedNanoseconds();
			examResult.passed = stepResult.passed;
			examResult.error = stepResult.error;

			if (stepResult.passed)
			{
				await next(isochronon);
			}
		};
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

