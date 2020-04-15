import { Examine } from "../examination";
import { examineStep, ExaminationResultSet, examinationResultSetFactory, StepSubject } from "./";

export const examineStepExecutionFactory = (subject: StepSubject, nextStepExamine: Examine): Examine =>
{
	return async (stepExaminationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		const stepExaminationResult = await examineStep(subject, nextStepExamine);
		stepExaminationResultSet = examinationResultSetFactory(stepExaminationResultSet, subject.proofStep, stepExaminationResult.examinationResult);
		return stepExaminationResult.nextStepExamine(stepExaminationResultSet);
	};
};