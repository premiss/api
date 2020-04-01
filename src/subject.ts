import { ProofStep, ProofStepSignature } from "./";

export interface Subject
{
	proofStep: Readonly<ProofStep>;
	proofStepSignature: ProofStepSignature;
}