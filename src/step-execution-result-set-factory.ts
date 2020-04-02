import { ProofStep, StepExecuteResult, StepExecutionResultSet } from "./";

export const stepExecutionResultSetFactory = (stepExecutionResult: StepExecutionResultSet, proofStep: ProofStep, stepExecuteResult: StepExecuteResult, elapsedNanoseconds: bigint): StepExecutionResultSet =>
{
	return {...stepExecutionResult, [proofStep]: { passed: stepExecuteResult.passed, elapsedNanoseconds, stepExecutionError: stepExecuteResult.stepExecutionError }};
};