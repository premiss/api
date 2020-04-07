import { Examine } from "../examine";
import { StepExaminationResultSet } from "./.";
import { stepExaminationResultSetFactory } from "./step-examination-result-set-factory";
import { stepExaminationResultFactory } from "./step-examination-result-factory";
import { StepSubject } from "./step-subject";

export const examineStepExecutionFactory = (subject: StepSubject, nextStepExamine: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		const stepExaminationResult = await stepExaminationResultFactory(subject, nextStepExamine);
		stepExaminationResultSet = stepExaminationResultSetFactory(stepExaminationResultSet, subject.proofStep, stepExaminationResult.examinationResult);
		return stepExaminationResult.nextStepExamine(stepExaminationResultSet);
	};
};