import { Examine } from "../examine";
import { StepExaminationResultSet } from "./.";
import { stepExaminationResultSetFactory } from "./step-examination-result-set-factory";
import { examineStep } from "./examine-step";
import { StepSubject } from "./step-subject";

export const examineStepExecutionFactory = (subject: StepSubject, nextStepExamine: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		const stepExaminationResult = await examineStep(subject, nextStepExamine);
		stepExaminationResultSet = stepExaminationResultSetFactory(stepExaminationResultSet, subject.proofStep, stepExaminationResult.examinationResult);
		return stepExaminationResult.nextStepExamine(stepExaminationResultSet);
	};
};