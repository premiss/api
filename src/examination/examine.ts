import { ExaminationResultSet } from "./";

export interface Examine
{
	(stepExecutionResultSet: ExaminationResultSet): Promise<ExaminationResultSet>;
}