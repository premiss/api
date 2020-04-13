import { ExaminationResult } from "../examination";
import { ProofStepSignature } from "../proof-step-signature";

export const executeStep = async (proofStepSignature: ProofStepSignature): Promise<ExaminationResult> =>
{
	await proofStepSignature();
	const passed = true;
	const examinationError = undefined;
	return { passed, examinationError };
};