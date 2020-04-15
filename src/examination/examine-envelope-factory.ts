import { ExaminationResultSet } from "../step-examination";
import { Examine } from "./";

export const examineEnvelopeFactory = (innerExaminer: Examine, outerExaminer: Examine) =>
{
	return async (stepExaminationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		stepExaminationResultSet = await innerExaminer(stepExaminationResultSet);
		return outerExaminer(stepExaminationResultSet);
	};
};