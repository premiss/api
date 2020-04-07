import { ExamResult, ExaminationError, ExaminationResult, ProofStep, TimedResult } from "./";
import { StepExaminer, StepExecutionResultSet } from "./examination/step-examination";

const emptyExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: false, examinationError: undefined }
	};

const emptyStepExecutionResultSet: StepExecutionResultSet =
	{
		[ProofStep.arrange]: emptyExaminationResult,
		[ProofStep.act]: emptyExaminationResult,
		[ProofStep.assert]: emptyExaminationResult,
		[ProofStep.annul]: emptyExaminationResult
	};

const getExaminationError = (stepExecutionResultSet: StepExecutionResultSet): ExaminationError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].result.examinationError
		|| stepExecutionResultSet[ProofStep.act].result.examinationError
		|| stepExecutionResultSet[ProofStep.assert].result.examinationError
		|| stepExecutionResultSet[ProofStep.annul].result.examinationError;
};

const allStepsPassed = (stepExecutionResultSet: StepExecutionResultSet): boolean =>
{
	return stepExecutionResultSet[ProofStep.arrange].result.passed
		&& stepExecutionResultSet[ProofStep.act].result.passed
		&& stepExecutionResultSet[ProofStep.assert].result.passed
		&& stepExecutionResultSet[ProofStep.annul].result.passed;
};

export const examResultFactory = async (stepExaminer: StepExaminer): Promise<ExamResult> =>
{
	const stepExecutionResultSet = await stepExaminer.probe(emptyStepExecutionResultSet);
	const passed = allStepsPassed(stepExecutionResultSet);
	const executionError = getExaminationError(stepExecutionResultSet);
	return { passed, examinationError: executionError, stepExecutionResultSet };
};