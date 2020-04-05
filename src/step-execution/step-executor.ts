import { StepExaminer, StepExecutionResultSet } from "./";
import { stepExecutionResultSetFactory } from "./step-execution-result-set-factory";
import { stepExecutorResultFactory } from "./step-executor-result-factory";
import { Subject } from "./subject";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		const timedExecuteResult = await stepExecutorResultFactory(this.subject, this.nextStepExaminer);
		stepExecutionResultSet = stepExecutionResultSetFactory(stepExecutionResultSet, this.subject.proofStep, timedExecuteResult.result.stepResult, timedExecuteResult.elapsedNanoseconds);
		return timedExecuteResult.result.nextStepExaminer.probe(stepExecutionResultSet);
	}
}