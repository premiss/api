import { ProofStep } from "../";

export interface StepExecutionError
{
	readonly error: unknown;
	readonly proofStep: ProofStep;
}