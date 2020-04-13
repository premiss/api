import { Proof, ProofExaminationResult, ProofStep } from "../";
import { emptyStepExaminationResultSet, examineStepFactory, StepExaminationResultSet } from "../step-examination";
import { ExaminationError, Examine, examineEnvelopeFactory, examinePassThru } from "./";

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

const proofExamineFactory = (proof: Proof): Examine =>
{
	const examineAssert = examineStepFactory(proof, ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(proof, ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(proof, ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(proof, ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return examineEnvelopeFactory(examineArrange, examineAnnul);
};

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = proofExamineFactory(proof);
	const stepExaminationResultSet = await examine(emptyStepExaminationResultSet);
	const passed = allStepsPassed(stepExaminationResultSet);
	const examinationError = getExaminationError(stepExaminationResultSet);
	return { passed, examinationError, stepExaminationResultSet };
};