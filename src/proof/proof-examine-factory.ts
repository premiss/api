import { Examine, examineEnvelopeFactory, examinePassThru } from "../examination";
import { examineStepFactory } from "../step-examination";
import { Proof, ProofStep } from "./";

export const proofExamineFactory = (proof: Proof): Examine =>
{
	const examineAssert = examineStepFactory(proof, ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(proof, ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(proof, ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(proof, ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return examineEnvelopeFactory(examineArrange, examineAnnul);
};