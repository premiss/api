import { ExaminationOutcome, ExaminationResult } from "../examination";
import { ProofStepSignature } from "../proof";

export const executeStep = async (proofStepSignature: ProofStepSignature): Promise<ExaminationResult> =>
{
	await proofStepSignature();
	const examinationOutcome = ExaminationOutcome.Passed;
	const examinationError = undefined;
	return { examinationOutcome, examinationError };
};