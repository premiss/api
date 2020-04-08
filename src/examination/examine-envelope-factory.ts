import { StepExaminationResultSet } from "../step-examination";
import { Examine } from "./";

export const examineEnvelopeFactory = (innerExaminer: Examine, outerExaminer: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		stepExaminationResultSet = await innerExaminer(stepExaminationResultSet);
		return outerExaminer(stepExaminationResultSet);
	};
};