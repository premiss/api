import { StepExecutionResultSet } from "./";

export interface StepExaminer
{
	readonly probe: (stepExecutionResult: StepExecutionResultSet) => Promise<StepExecutionResultSet>;
}