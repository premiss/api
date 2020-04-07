import { Proof, ProofStep } from "../../index";
import { Examine } from "../examine";
import { examineStepFactory } from "./.";
import { examineEnvelopeFactory } from "./examine-envelope-factory";
import { examinePassThru } from "./examine-pass-thru";

export const stepExaminerChainFactory = (proof: Proof): Examine =>
{
	const examineAssert = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return examineEnvelopeFactory(examineArrange, examineAnnul);
};