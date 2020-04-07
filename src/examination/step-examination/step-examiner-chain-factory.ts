import { Proof, ProofStep } from "../../index";
import { examineStepFactory, StepExaminer } from "./.";
import { endStepExaminer } from "./end-step-examiner";
import { StepExaminerEnvelope } from "./step-examiner-envelope";

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const assertExaminer = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], endStepExaminer);
	const actExaminer = examineStepFactory(ProofStep.act, proof[ProofStep.act], assertExaminer);
	const arrangeExaminer = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], actExaminer);
	const annulExaminer = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], endStepExaminer);
	return new StepExaminerEnvelope((stepExecutionResultSet) => arrangeExaminer.probe(stepExecutionResultSet), (stepExecutionResultSet) => annulExaminer.probe(stepExecutionResultSet));
};