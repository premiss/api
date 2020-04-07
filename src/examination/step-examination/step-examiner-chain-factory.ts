import { Proof, ProofStep } from "../../index";
import { Examine } from "../examine";
import { examineStepFactory } from "./.";
import { examinePassThru } from "./examine-pass-thru";
import { StepExaminerEnvelope } from "./step-examiner-envelope";

export const stepExaminerChainFactory = (proof: Proof): Examine =>
{
	const examineAssert = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const examineAct = examineStepFactory(ProofStep.act, proof[ProofStep.act], examineAssert);
	const examineArrange = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], examineAct);
	const examineAnnul = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return (stepExaminationResultSet) => (new StepExaminerEnvelope(examineArrange, examineAnnul)).probe(stepExaminationResultSet);
};