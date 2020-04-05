import { ExamResult, ProofStep, timedAsyncCall } from "./";
import { StepExaminer, ExecutionError, ExecutionResult, StepExecutionResultSet } from "./step-execution";

const emptyExecutionResult: ExecutionResult =
	{
		passed: false,
		elapsedNanoseconds: BigInt(0),
		executionError: undefined
	};

const emptyStepExecutionResultSet: StepExecutionResultSet =
	{
		[ProofStep.arrange]: emptyExecutionResult,
		[ProofStep.act]: emptyExecutionResult,
		[ProofStep.assert]: emptyExecutionResult,
		[ProofStep.annul]: emptyExecutionResult
	};

const getExecutionError = (stepExecutionResultSet: StepExecutionResultSet): ExecutionError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].executionError
		|| stepExecutionResultSet[ProofStep.act].executionError
		|| stepExecutionResultSet[ProofStep.assert].executionError
		|| stepExecutionResultSet[ProofStep.annul].executionError;
};

export const examResultFactory = async (stepExaminer: StepExaminer): Promise<ExamResult> =>
{
	const timedStepExecutionResult = await timedAsyncCall(() => stepExaminer.probe(emptyStepExecutionResultSet));
	const elapsedNanoseconds = timedStepExecutionResult.elapsedNanoSeconds;
	const passed = timedStepExecutionResult.result[ProofStep.annul].passed;
	const executionError = getExecutionError(timedStepExecutionResult.result);
	const stepExecutionResultSet = timedStepExecutionResult.result;
	return { elapsedNanoseconds, passed, executionError, stepExecutionResultSet };
};