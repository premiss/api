import { ProofStep } from "./";

export interface StepExecutionError
{
	error: Readonly<unknown>;
	proofStep: Readonly<ProofStep>;
}