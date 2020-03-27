import { ProofStep } from "./proof-step";

export interface Proof
{
	[ProofStep.arrange]?: () => Promise<void>;
	[ProofStep.act]?: () => Promise<void>;
	[ProofStep.assert]: () => Promise<void>;
}