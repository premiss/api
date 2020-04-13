import { ExaminationResult } from "../examination";
import { ProofStep } from "../proof-step";

export const erredExaminationResultFactory = (error: unknown, proofStep: ProofStep): ExaminationResult =>
{
	const passed = false;
	const examinationError = { error, proofStep };
	return { passed, examinationError };
};