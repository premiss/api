import { ExaminationResultSet } from "../step-examination";

export interface Examine
{
	(stepExecutionResultSet: ExaminationResultSet): Promise<ExaminationResultSet>;
}