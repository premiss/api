import { StepExecutionResultSet } from "../";

export interface StepExaminer
{
	readonly probe: (stepExecutionResultSet: StepExecutionResultSet) => Promise<StepExecutionResultSet>;
}