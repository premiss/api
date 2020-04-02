import { ProofStep, ProofStepSignature } from "./";

export interface Proof
{
	readonly [ProofStep.arrange]?: ProofStepSignature;
	readonly [ProofStep.act]?: ProofStepSignature;
	readonly [ProofStep.assert]: ProofStepSignature;
}