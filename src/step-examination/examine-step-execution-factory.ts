import { ExaminationResultSet, examinationResultSetFactory, Examine } from "../examination";
import { examineStep, StepSubject } from "./";

export const examineStepExecutionFactory = (subject: StepSubject, nextStepExamine: Examine): Examine =>
{
	return async (examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		const stepExaminationResult = await examineStep(subject, nextStepExamine);
		examinationResultSet = examinationResultSetFactory(examinationResultSet, subject.proofStep, stepExaminationResult.examinationResult);
		return stepExaminationResult.nextStepExamine(examinationResultSet);
	};
};