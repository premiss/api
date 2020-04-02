import { endStepExaminer, StepExaminer, StepExecuteResult, StepExecutionResult, stepExecutionResultFactory, Subject, timedAsyncCall } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: Readonly<StepExaminer>)
	{
	}

	public async probe(stepExecutionResult: StepExecutionResult): Promise<StepExecutionResult>
	{
		const timedExecuteResult = await timedAsyncCall(() => this.execute());
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultFactory(stepExecutionResult, this.subject.proofStep, timedExecuteResult.result.stepExecuteResult, timedExecuteResult.elapsedNanoSeconds));
	}

	private async execute(): Promise<{ stepExecuteResult: StepExecuteResult; nextStepExaminer: Readonly<StepExaminer>; }>
	{
		try
		{
			await this.subject.proofStepSignature();
			return { stepExecuteResult: { passed: true, stepExecutionError: undefined }, nextStepExaminer: this.nextStepExaminer };
		}
		catch (error)
		{
			return { stepExecuteResult: { passed: false, stepExecutionError: { error, proofStep: this.subject.proofStep } }, nextStepExaminer: endStepExaminer };
		}
	}
}