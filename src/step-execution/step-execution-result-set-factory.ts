import { ProofStep, StepExecutionResultSet } from "../";
import { StepResult } from "./step-result";

export const stepExecutionResultSetFactory = (stepExecutionResultSet: StepExecutionResultSet, proofStep: ProofStep, stepResult: StepResult, elapsedNanoseconds: bigint): StepExecutionResultSet =>
{
	const passed = stepResult.passed;
	const stepExecutionError = stepResult.stepExecutionError;
	return { ...stepExecutionResultSet, [proofStep]: { passed, elapsedNanoseconds, stepExecutionError } };
};