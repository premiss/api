import { ProofStep } from "../";
import { StepExecutionResultSet } from "./";
import { StepResult } from "./step-result";

export const stepExecutionResultSetFactory = (stepExecutionResultSet: StepExecutionResultSet, proofStep: ProofStep, stepResult: StepResult, elapsedNanoseconds: bigint): StepExecutionResultSet =>
{
	const passed = stepResult.passed;
	const executionError = stepResult.executionError;
	return { ...stepExecutionResultSet, [proofStep]: { passed, elapsedNanoseconds, executionError } };
};