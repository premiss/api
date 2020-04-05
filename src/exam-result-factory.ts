import { ExamResult, ProofStep, timedAsyncCall } from "./";
import { StepExaminer, StepExecutionError, ExecutionResult, StepExecutionResultSet } from "./step-execution";

const emptyExecutionResult: ExecutionResult =
	{
		passed: false,
		elapsedNanoseconds: BigInt(0),
		stepExecutionError: undefined
	};

const emptyStepExecutionResultSet: StepExecutionResultSet =
	{
		[ProofStep.arrange]: emptyExecutionResult,
		[ProofStep.act]: emptyExecutionResult,
		[ProofStep.assert]: emptyExecutionResult,
		[ProofStep.annul]: emptyExecutionResult
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