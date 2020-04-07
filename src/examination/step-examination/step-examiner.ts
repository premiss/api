import { StepExaminationResultSet } from "./.";

export interface StepExaminer
{
	readonly probe: (stepExaminationResultSet: StepExaminationResultSet) => Promise<StepExaminationResultSet>;
}