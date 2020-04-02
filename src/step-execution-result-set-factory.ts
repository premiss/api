import { ProofStep, StepExecuteResult, StepExecutionResultSet } from "./";

export const stepExecutionResultSetFactory = (stepExecutionResultSet: StepExecutionResultSet, proofStep: ProofStep, stepExecuteResult: StepExecuteResult, elapsedNanoseconds: bigint): StepExecutionResultSet =>
{
	const passed = stepExecuteResult.passed;
	const stepExecutionError = stepExecuteResult.stepExecutionError;
	return { ...stepExecutionResultSet, [proofStep]: { passed, elapsedNanoseconds, stepExecutionError } };
};