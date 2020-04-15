import { ExaminationResultSet, Examine } from "./";

export const examinePassThru: Examine = async (examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
{
	return examinationResultSet;
};