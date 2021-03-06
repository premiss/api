import { ExaminationResultSet, Examine } from "./";

export const examineEnvelopeFactory = (innerExaminer: Examine, outerExaminer: Examine) =>
{
	return async (examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		examinationResultSet = await innerExaminer(examinationResultSet);
		return outerExaminer(examinationResultSet);
	};
};