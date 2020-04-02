import { endStepExaminer, StepExaminer, StepExecuteResult, StepExecutionResultSet, stepExecutionResultSetFactory, Subject, timedAsyncCall } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResult: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		const timedExecuteResult = await timedAsyncCall(() => this.execute());
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultSetFactory(stepExecutionResult, this.subject.proofStep, timedExecuteResult.result.stepExecuteResult, timedExecuteResult.elapsedNanoSeconds));
	}

	private async execute(): Promise<{ stepExecuteResult: StepExecuteResult; nextStepExaminer: StepExaminer; }>
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