import { StepExaminationResultSet } from "../step-examination";
import { Examine } from "./";

export const examinePassThru: Examine = async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
{
	return stepExaminationResultSet;
};