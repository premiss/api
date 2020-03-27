import { StepResult } from "./step-result";

export interface StepExecutionInspector
{
	(record: Readonly<StepResult>): void;
}