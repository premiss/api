import { Examine } from "../examine";
import { StepExaminationResultSet } from "./index";

export const examinePassThru: Examine = async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
{
	return stepExaminationResultSet;
};