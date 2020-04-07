import { ExecutionResult, ProofStep, TimedResult } from "../../index";
import { StepExecutionResultSet } from "./.";

export const stepExecutionResultSetFactory = (stepExecutionResultSet: StepExecutionResultSet, proofStep: ProofStep, timedExecutionResult: TimedResult<ExecutionResult>): StepExecutionResultSet =>
{
	return { ...stepExecutionResultSet, [proofStep]: timedExecutionResult };
};