import { Examine } from "../examine";
import { StepExaminationResultSet } from "./.";
import { stepExecutionResultSetFactory } from "./step-execution-result-set-factory";
import { stepExecutorResultFactory } from "./step-executor-result-factory";
import { Subject } from "./subject";

export const examineStepExecutionFactory = (subject: Subject, nextStepExamine: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		const stepExecutorResult = await stepExecutorResultFactory(subject, nextStepExamine);
		stepExaminationResultSet = stepExecutionResultSetFactory(stepExaminationResultSet, subject.proofStep, stepExecutorResult.examinationResult);
		return stepExecutorResult.nextStepExamine(stepExaminationResultSet);
	};
};