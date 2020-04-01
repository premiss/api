import { StepExecutionResult } from "./";

export interface StepExaminer
{
	probe: (stepExecutionResult: StepExecutionResult) => Promise<StepExecutionResult>;
}