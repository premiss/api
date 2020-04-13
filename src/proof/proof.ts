import { ProofStep } from "../";
import { ProofStepSignature } from "./proof-step-signature";

export interface Proof
{
	readonly [ProofStep.arrange]?: ProofStepSignature;
	readonly [ProofStep.act]?: ProofStepSignature;
	readonly [ProofStep.assert]: ProofStepSignature;
	readonly [ProofStep.annul]?: ProofStepSignature;
}