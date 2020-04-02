import { endStepExaminer, ProofStep, StepExaminer, StepExecutionError, StepExecutionResult, Subject, timedAsyncCall, TimedResult } from "./";

type ExecuteResult = Readonly<{ passed: boolean; stepExecutionError: StepExecutionError | undefined; nextStepExaminer: Readonly<StepExaminer>; }>

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(stepExecutionResult: StepExecutionResult): Promise<StepExecutionResult>
	{
		const timedExecuteResult = await timedAsyncCall(() => this.execute());
		return timedExecuteResult.result.nextStepExaminer.probe(StepExecutor.getStepExecutionResult(stepExecutionResult, this.subject.proofStep, timedExecuteResult));
	}

	private static getStepExecutionResult(stepExecutionResult: StepExecutionResult, proofStep: ProofStep, timedExecuteResult: TimedResult<ExecuteResult>): StepExecutionResult
	{
		return {...stepExecutionResult, [proofStep]: { passed: timedExecuteResult.result.passed, elapsedNanoseconds: timedExecuteResult.elapsedNanoSeconds, stepExecutionError: timedExecuteResult.result.stepExecutionError }};
	}

	private async execute(): Promise<ExecuteResult>
	{
		try
		{
			await this.subject.proofStepSignature();
			return { passed: true, stepExecutionError: undefined, nextStepExaminer: this.nextStepExaminer };
		}
		catch (error)
		{
			return { passed: false, stepExecutionError: { error, proofStep: this.subject.proofStep }, nextStepExaminer: endStepExaminer };
		}
	}
}