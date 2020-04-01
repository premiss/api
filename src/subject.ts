import { ProofStep, ProofStepSignature } from "./";

export type Subject = Readonly<{ proofStep: Readonly<ProofStep>; proofStepSignature: ProofStepSignature; }>;