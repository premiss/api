import { endStepExaminer, StepExaminer, StepExecuteResult, StepExecutionResultSet, stepExecutionResultSetFactory, Subject, timedAsyncCall } from "./";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		const timedExecuteResult = await timedAsyncCall(() => this.execute());
		stepExecutionResultSet = stepExecutionResultSetFactory(stepExecutionResultSet, this.subject.proofStep, timedExecuteResult.result.stepExecuteResult, timedExecuteResult.elapsedNanoSeconds);
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultSet);
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