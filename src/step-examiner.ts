import { StepExecutionResultSet } from "./";

export interface StepExaminer
{
	probe: (stepExecutionResult: StepExecutionResultSet) => Promise<StepExecutionResultSet>;
}