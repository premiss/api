import { ProofStep, ProofStepSignature } from "./";

export interface Proof
{
	[ProofStep.arrange]?: ProofStepSignature;
	[ProofStep.act]?: ProofStepSignature;
	[ProofStep.assert]: ProofStepSignature;
}