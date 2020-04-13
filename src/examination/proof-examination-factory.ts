import { Proof } from "../proof";
import { ProofStep } from "../proof-step";
import { examineStepFactory } from "../step-examination";
import { Examine } from "./examine";
import { examineEnvelopeFactory } from "./examine-envelope-factory";
import { examinePassThru } from "./examine-pass-thru";

export const proofExamineFactory = (proof: Proof): Examine =>
{
	const examineAssert = examineStepFactory(proof, ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(proof, ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(proof, ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(proof, ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return examineEnvelopeFactory(examineArrange, examineAnnul);
};