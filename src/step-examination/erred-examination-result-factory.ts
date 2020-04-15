import { ExaminationOutcome, ExaminationResult } from "../examination";
import { ProofStep } from "../proof";

export const erredExaminationResultFactory = (error: unknown, proofStep: ProofStep): ExaminationResult =>
{
	const examinationOutcome = ExaminationOutcome.Failed;
	const passed = false;
	const examinationError = { error, proofStep };
	return { examinationOutcome, passed, examinationError };
};