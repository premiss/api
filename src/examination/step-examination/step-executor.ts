import { StepExaminer, StepExaminationResultSet } from "./.";
import { stepExecutionResultSetFactory } from "./step-execution-result-set-factory";
import { stepExecutorResultFactory } from "./step-executor-result-factory";
import { Subject } from "./subject";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>
	{
		const stepExecutorResult = await stepExecutorResultFactory(this.subject, this.nextStepExaminer);
		stepExaminationResultSet = stepExecutionResultSetFactory(stepExaminationResultSet, this.subject.proofStep, stepExecutorResult.examinationResult);
		return stepExecutorResult.nextStepExaminer.probe(stepExaminationResultSet);
	}
}