import { StepResult } from "./";

export interface StepExecutionInspector
{
	(record: Readonly<StepResult>): void;
}