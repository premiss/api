import { Proof, ProofStep } from "../../index";
import { examineStepFactory, StepExaminer } from "./.";
import { examinePassThru } from "./examine-pass-thru";
import { StepExaminerEnvelope } from "./step-examiner-envelope";

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const examineAssert = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return new StepExaminerEnvelope(examineArrange, examineAnnul);
};