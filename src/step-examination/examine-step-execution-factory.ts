import { Examine } from "../examination";
import { examineStep, StepExaminationResultSet, stepExaminationResultSetFactory, StepSubject } from "./";

export const examineStepExecutionFactory = (subject: StepSubject, nextStepExamine: Examine): Examine =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		const stepExaminationResult = await examineStep(subject, nextStepExamine);
		stepExaminationResultSet = stepExaminationResultSetFactory(stepExaminationResultSet, subject.proofStep, stepExaminationResult.examinationResult);
		return stepExaminationResult.nextStepExamine(stepExaminationResultSet);
	};
};