import { ExamResult, ProofStep, StepExecutionError, StepExecutionResult, TimedResult } from "./";

const getExecutionError = (stepExecutionResult: StepExecutionResult): StepExecutionError | undefined =>
{
	return stepExecutionResult[ProofStep.arrange].stepExecutionError
		|| stepExecutionResult[ProofStep.act].stepExecutionError
		|| stepExecutionResult[ProofStep.assert].stepExecutionError;
};

export const examResultFactory = (timedStepExecutionResult: TimedResult<StepExecutionResult>): ExamResult =>
{
	const passed = timedStepExecutionResult.result[ProofStep.assert].passed;
	const stepExecutionError = getExecutionError(timedStepExecutionResult.result);
	return { elapsedNanoseconds: timedStepExecutionResult.elapsedNanoSeconds, passed, stepExecutionError };
};