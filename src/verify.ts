import { ExamResult, Proof, ProofStep, stepExaminerChainFactory, StepExecutionError, StepExecutionResult, StepExecutionResultSet, timedAsyncCall, TimedResult } from "./";

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

const examResultFactory = (timedStepExecutionResult: TimedResult<StepExecutionResultSet>): ExamResult =>
{
	const elapsedNanoseconds = timedStepExecutionResult.elapsedNanoSeconds;
	const passed = timedStepExecutionResult.result[ProofStep.annul].passed;
	const stepExecutionError = getExecutionError(timedStepExecutionResult.result);
	const stepExecutionResultSet = timedStepExecutionResult.result;
	return { elapsedNanoseconds, passed, stepExecutionError, stepExecutionResultSet };
};

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	const timedStepExecutionResult = await timedAsyncCall(() => stepExaminerChain.probe(emptyStepExecutionResultSet));
	return examResultFactory(timedStepExecutionResult);
};