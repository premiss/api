import { ProofStep } from "../index";

export interface ExaminationError
{
	readonly error: unknown;
	readonly proofStep: ProofStep;
}