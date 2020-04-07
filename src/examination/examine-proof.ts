import { ExaminationError, ExaminationResult, Proof, ProofExaminationResult, ProofStep, TimedResult } from "../index";
import { StepExaminationResultSet, stepExaminerChainFactory } from "./step-examination";

const emptyExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: false, examinationError: undefined }
	};

const emptyStepExaminationResultSet: StepExaminationResultSet =
	{
		[ProofStep.arrange]: emptyExaminationResult,
		[ProofStep.act]: emptyExaminationResult,
		[ProofStep.assert]: emptyExaminationResult,
		[ProofStep.annul]: emptyExaminationResult
	};

const getExaminationError = (stepExecutionResultSet: StepExaminationResultSet): ExaminationError | undefined =>
{
	return stepExecutionResultSet[ProofStep.arrange].result.examinationError
		|| stepExecutionResultSet[ProofStep.act].result.examinationError
		|| stepExecutionResultSet[ProofStep.assert].result.examinationError
		|| stepExecutionResultSet[ProofStep.annul].result.examinationError;
};

const allStepsPassed = (stepExaminationResultSet: StepExaminationResultSet): boolean =>
{
	return stepExaminationResultSet[ProofStep.arrange].result.passed
		&& stepExaminationResultSet[ProofStep.act].result.passed
		&& stepExaminationResultSet[ProofStep.assert].result.passed
		&& stepExaminationResultSet[ProofStep.annul].result.passed;
};

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = stepExaminerChainFactory(proof);
	const stepExecutionResultSet = await examine(emptyStepExaminationResultSet);
	const passed = allStepsPassed(stepExecutionResultSet);
	const executionError = getExaminationError(stepExecutionResultSet);
	return { passed, examinationError: executionError, stepExaminationResultSet: stepExecutionResultSet };
};