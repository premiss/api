import { ExaminationError, Proof, ProofExaminationResult, ProofStep } from "../index";
import { StepExaminationResultSet, stepExaminerChainFactory } from "./step-examination";
import { emptyStepExaminationResultSet } from "./step-examination/exmpty-step-examination-result";

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