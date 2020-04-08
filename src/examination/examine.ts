import { StepExaminationResultSet } from "../step-examination";

export interface Examine
{
	(stepExecutionResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>;
}