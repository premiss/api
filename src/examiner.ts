import { emptyStepExecutionResult, ExamResult, Proof, ProofStep, Registrar, stepExaminerChainFactory, StepExecutionError, StepExecutionResult, timedAsyncCall, TimedResult } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const examResult = await this.executeSteps(proof);
		await this.registrar.record(examResult);
	}

	private async executeSteps(proof: Readonly<Proof>): Promise<Readonly<ExamResult>>
	{
		const stepExaminerChain = stepExaminerChainFactory(proof);
		const timedStepExecutionResult = await timedAsyncCall(() => stepExaminerChain.probe(emptyStepExecutionResult));
		return Examiner.createExamResult(timedStepExecutionResult);
	}

	private static createExamResult(timedStepExecutionResult: TimedResult<StepExecutionResult>): ExamResult
	{
		const passed = timedStepExecutionResult.result[ProofStep.assert].passed;
		const stepExecutionError = Examiner.getExecutionError(timedStepExecutionResult.result);
		return { elapsedNanoseconds: timedStepExecutionResult.elapsedNanoSeconds, passed, stepExecutionError };
	}

	private static getExecutionError(stepExecutionResult: StepExecutionResult): StepExecutionError | undefined
	{
		return stepExecutionResult[ProofStep.arrange].stepExecutionError
			|| stepExecutionResult[ProofStep.act].stepExecutionError
			|| stepExecutionResult[ProofStep.assert].stepExecutionError;
	}
}