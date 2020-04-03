import { ExamResult, ProofStep, StepExaminer, StepExecutionError, StepExecutionResult, StepExecutionResultSet, timedAsyncCall } from "./";

const emptyStepExecutionResult: StepExecutionResult =
	{
		passed: false,
		elapsedNanoseconds: BigInt(0),
		stepExecutionError: undefined
	};

const emptyStepExecutionResultSet: StepExecutionResultSet =
	{
		[ProofStep.arrange]: emptyStepExecutionResult,
		[ProofStep.act]: emptyStepExecutionResult,
		[ProofStep.assert]: emptyStepExecutionResult,
		[ProofStep.annul]: emptyStepExecutionResult
	};

const getExecutionError = (stepExecutionResultSet: StepExecutionResultSet): StepExecutionError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].stepExecutionError
		|| stepExecutionResultSet[ProofStep.act].stepExecutionError
		|| stepExecutionResultSet[ProofStep.assert].stepExecutionError
		|| stepExecutionResultSet[ProofStep.annul].stepExecutionError;
};

export const examResultFactory = async (stepExaminer: StepExaminer): Promise<ExamResult> =>
{
	const timedStepExecutionResult = await timedAsyncCall(() => stepExaminer.probe(emptyStepExecutionResultSet));
	const elapsedNanoseconds = timedStepExecutionResult.elapsedNanoSeconds;
	const passed = timedStepExecutionResult.result[ProofStep.annul].passed;
	const stepExecutionError = getExecutionError(timedStepExecutionResult.result);
	const stepExecutionResultSet = timedStepExecutionResult.result;
	return { elapsedNanoseconds, passed, stepExecutionError, stepExecutionResultSet };
};