import { StepExaminer, StepExecutionResultSet, stepExecutionResultSetFactory, stepExecutorResultFactory, Subject } from "../";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		const timedExecuteResult = await stepExecutorResultFactory(this.subject, this.nextStepExaminer);
		stepExecutionResultSet = stepExecutionResultSetFactory(stepExecutionResultSet, this.subject.proofStep, timedExecuteResult.result.stepResult, timedExecuteResult.elapsedNanoSeconds);
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultSet);
	}
}