import { ExamResult, ExecutionError, ExecutionResult, ProofStep, TimedResult } from "./";
import { StepExaminer, StepExecutionResultSet } from "./step-execution";

const emptyExecutionResult: TimedResult<ExecutionResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: false, executionError: undefined }
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
	return stepExecutionResultSet[ProofStep.arrange].result.executionError
		|| stepExecutionResultSet[ProofStep.act].result.executionError
		|| stepExecutionResultSet[ProofStep.assert].result.executionError
		|| stepExecutionResultSet[ProofStep.annul].result.executionError;
};

export const examResultFactory = async (stepExaminer: StepExaminer): Promise<ExamResult> =>
{
	const stepExecutionResultSet = await stepExaminer.probe(emptyStepExecutionResultSet);
	const passed = stepExecutionResultSet[ProofStep.annul].result.passed;
	const executionError = getExecutionError(stepExecutionResultSet);
	return { passed, executionError, stepExecutionResultSet };
};