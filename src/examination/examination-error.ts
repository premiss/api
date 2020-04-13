import { ProofStep } from "../proof";

export interface ExaminationError
{
	readonly error: unknown;
	readonly proofStep: ProofStep;
}