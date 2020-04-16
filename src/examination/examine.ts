import { ExaminationResultSet } from "./";

export interface Examine
{
	(examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet>;
}