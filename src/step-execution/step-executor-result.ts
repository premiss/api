import { StepExaminer } from "./step-examiner";
import { StepResult } from "./step-result";

export interface StepExecutorResult
{
	readonly stepResult: StepResult;
	readonly nextStepExaminer: StepExaminer;
}