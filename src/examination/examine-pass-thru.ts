import { StepExaminationResultSet } from "../step-examination";
import { Examine } from "./examine";

export const examinePassThru: Examine = async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
{
	return stepExaminationResultSet;
};