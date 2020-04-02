import { ProofStep, StepExecuteResult, StepExecutionResult } from "./";

export const stepExecutionResultFactory = (stepExecutionResult: StepExecutionResult, proofStep: ProofStep, stepExecuteResult: StepExecuteResult, elapsedNanoseconds: bigint): StepExecutionResult =>
{
	return {...stepExecutionResult, [proofStep]: { passed: stepExecuteResult.passed, elapsedNanoseconds, stepExecutionError: stepExecuteResult.stepExecutionError }};
};