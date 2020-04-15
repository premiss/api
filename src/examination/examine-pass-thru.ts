import { ExaminationResultSet } from "../step-examination";
import { Examine } from "./";

export const examinePassThru: Examine = async (stepExaminationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
{
	return stepExaminationResultSet;
};