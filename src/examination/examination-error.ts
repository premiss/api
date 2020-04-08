import { ProofStep } from "../";

export interface ExaminationError
{
	readonly error: unknown;
	readonly proofStep: ProofStep;
}