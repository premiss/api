import { Examine } from "../examine";
import { StepExaminationResultSet, StepExaminer } from "./.";
import { stepExecutionResultSetFactory } from "./step-execution-result-set-factory";
import { stepExecutorResultFactory } from "./step-executor-result-factory";
import { Subject } from "./subject";

export class StepExecutor implements StepExaminer
{
	constructor(private readonly subject: Subject, private nextStepExamine: Examine)
	{
	}

	public async probe(stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>
	{
		const stepExecutorResult = await stepExecutorResultFactory(this.subject, this.nextStepExamine);
		stepExaminationResultSet = stepExecutionResultSetFactory(stepExaminationResultSet, this.subject.proofStep, stepExecutorResult.examinationResult);
		return stepExecutorResult.nextStepExamine(stepExaminationResultSet);
	}
}