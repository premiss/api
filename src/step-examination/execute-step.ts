import { ExaminationOutcomeObserved, ExaminationResult } from "../examination";
import { ProofStepSignature } from "../proof";

export const executeStep = async (proofStepSignature: ProofStepSignature): Promise<ExaminationResult> =>
{
	await proofStepSignature();
	const examinationOutcome = ExaminationOutcomeObserved.passed;
	const examinationError = undefined;
	return { examinationOutcome, examinationError };
};