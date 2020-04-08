import { Examine } from "./examine";
import { StepExaminationResultSet } from "../step-examination/step-examination-result-set";

export const examineEnvelopeFactory = (innerExaminer: Examine, outerExaminer: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		stepExaminationResultSet = await innerExaminer(stepExaminationResultSet);
		return outerExaminer(stepExaminationResultSet);
	};
};