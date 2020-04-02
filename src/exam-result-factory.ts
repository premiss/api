import { ExamResult, ProofStep, StepExecutionError, StepExecutionResultSet, TimedResult } from "./";

const getExecutionError = (stepExecutionResult: StepExecutionResultSet): StepExecutionError | undefined =>
{
	return stepExecutionResult[ProofStep.arrange].stepExecutionError
		|| stepExecutionResult[ProofStep.act].stepExecutionError
		|| stepExecutionResult[ProofStep.assert].stepExecutionError;
};

export const examResultFactory = (timedStepExecutionResult: TimedResult<StepExecutionResultSet>): ExamResult =>
{
	const elapsedNanoseconds = timedStepExecutionResult.elapsedNanoSeconds;
	const passed = timedStepExecutionResult.result[ProofStep.assert].passed;
	const stepExecutionError = getExecutionError(timedStepExecutionResult.result);
	const stepExecutionResult = timedStepExecutionResult.result;
	return { elapsedNanoseconds, passed, stepExecutionError, stepExecutionResult };
};