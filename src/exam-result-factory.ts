import { ExamResult, ProofStep, StepExecutionError, StepExecutionResultSet, TimedResult } from "./";

const getExecutionError = (stepExecutionResultSet: StepExecutionResultSet): StepExecutionError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].stepExecutionError
		|| stepExecutionResultSet[ProofStep.act].stepExecutionError
		|| stepExecutionResultSet[ProofStep.assert].stepExecutionError
		|| stepExecutionResultSet[ProofStep.annul].stepExecutionError;
};

export const examResultFactory = (timedStepExecutionResult: TimedResult<StepExecutionResultSet>): ExamResult =>
{
	const elapsedNanoseconds = timedStepExecutionResult.elapsedNanoSeconds;
	const passed = timedStepExecutionResult.result[ProofStep.annul].passed;
	const stepExecutionError = getExecutionError(timedStepExecutionResult.result);
	const stepExecutionResultSet = timedStepExecutionResult.result;
	return { elapsedNanoseconds, passed, stepExecutionError, stepExecutionResultSet };
};