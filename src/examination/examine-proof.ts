import { ExaminationError, Proof, ProofExaminationResult, ProofStep } from "../index";
import { Examine } from "./examine";
import { examineEnvelopeFactory } from "./examine-envelope-factory";
import { examineStepFactory, StepExaminationResultSet } from "./step-examination";
import { examinePassThru } from "./step-examination/examine-pass-thru";
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

const composeProofProbe = (proof: Proof): Examine =>
{
	const examineAssert = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return examineEnvelopeFactory(examineArrange, examineAnnul);
};

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = composeProofProbe(proof);
	const stepExecutionResultSet = await examine(emptyStepExaminationResultSet);
	const passed = allStepsPassed(stepExecutionResultSet);
	const executionError = getExaminationError(stepExecutionResultSet);
	return { passed, examinationError: executionError, stepExaminationResultSet: stepExecutionResultSet };
};