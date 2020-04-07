import { Examine } from "../examine";
import { StepExaminationResultSet } from "./.";
import { stepExaminationResultSetFactory } from "./step-examination-result-set-factory";
import { stepExecutorResultFactory } from "./step-executor-result-factory";
import { StepSubject } from "./step-subject";

export const examineStepExecutionFactory = (subject: StepSubject, nextStepExamine: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		const stepExecutorResult = await stepExecutorResultFactory(subject, nextStepExamine);
		stepExaminationResultSet = stepExaminationResultSetFactory(stepExaminationResultSet, subject.proofStep, stepExecutorResult.examinationResult);
		return stepExecutorResult.nextStepExamine(stepExaminationResultSet);
	};
};