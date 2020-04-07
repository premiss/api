import { Examine } from "./examine";
import { StepExaminationResultSet } from "./step-examination";

export const examinePassThru: Examine = async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
{
	return stepExaminationResultSet;
};