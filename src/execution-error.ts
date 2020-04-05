import { ProofStep } from "./";

export interface ExecutionError
{
	readonly error: unknown;
	readonly proofStep: ProofStep;
}