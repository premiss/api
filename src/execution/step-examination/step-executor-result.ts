import { ExecutionResult } from "../../execution-result";
import { TimedResult } from "../../timing";
import { StepExaminer } from "./.";

export interface StepExecutorResult
{
	readonly executionResult: TimedResult<ExecutionResult>;
	readonly nextStepExaminer: StepExaminer;
}