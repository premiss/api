import { ProofStep } from "../";
import { ProofStepSignature } from "../proof";

export interface StepSubject
{
	readonly proofStep: ProofStep;
	readonly proofStepSignature: ProofStepSignature;
}