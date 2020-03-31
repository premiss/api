import { ProofStep, ProofStepSignature } from "./";

export interface StepExecutionError
{
	error: Readonly<unknown>;
	proofStep: Readonly<ProofStep>;
}

export interface Subject
{
	proofStep: Readonly<ProofStep>;
	proofStepSignature: ProofStepSignature;
}