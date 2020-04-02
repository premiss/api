import { ProofStep, StepExecuteResult, StepExecutionResultSet } from "./";

export const stepExecutionResultSetFactory = (stepExecutionResult: StepExecutionResultSet, proofStep: ProofStep, stepExecuteResult: StepExecuteResult, elapsedNanoseconds: bigint): StepExecutionResultSet =>
{
	const passed = stepExecuteResult.passed;
	const stepExecutionError = stepExecuteResult.stepExecutionError;
	return { ...stepExecutionResult, [proofStep]: { passed, elapsedNanoseconds, stepExecutionError } };
};