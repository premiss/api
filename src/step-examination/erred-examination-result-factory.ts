import { ExaminationOutcomeObserved, ExaminationResult } from "../examination";
import { ProofStep } from "../proof";

export const erredExaminationResultFactory = (error: unknown, proofStep: ProofStep): ExaminationResult =>
{
	const examinationOutcome = ExaminationOutcomeObserved.Failed;
	const examinationError = { error, proofStep };
	return { examinationOutcome, examinationError };
};