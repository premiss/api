import { Proof, ProofStep } from "../../index";
import { examineStepFactory, StepExaminer } from "./.";
import { examinePassThru } from "./examine-pass-thru";
import { StepExaminerEnvelope } from "./step-examiner-envelope";

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const assertExaminer = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], examinePassThru);
	const actExaminer = examineStepFactory(ProofStep.act, proof[ProofStep.act], (stepExecutionResultSet) => assertExaminer.probe(stepExecutionResultSet));
	const arrangeExaminer = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], (stepExecutionResultSet) => actExaminer.probe(stepExecutionResultSet));
	const annulExaminer = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], examinePassThru);
	return new StepExaminerEnvelope((stepExecutionResultSet) => arrangeExaminer.probe(stepExecutionResultSet), (stepExecutionResultSet) => annulExaminer.probe(stepExecutionResultSet));
};