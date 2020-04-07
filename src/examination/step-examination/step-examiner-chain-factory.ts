import { Proof, ProofStep } from "../../index";
import { examineStepFactory, StepExaminer } from "./.";
import { endStepExaminer } from "./end-step-examiner";
import { StepExaminerEnvelope } from "./step-examiner-envelope";

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const assertExaminer = examineStepFactory(ProofStep.assert, proof[ProofStep.assert], (stepExecutionResultSet) => endStepExaminer.probe(stepExecutionResultSet));
	const actExaminer = examineStepFactory(ProofStep.act, proof[ProofStep.act], (stepExecutionResultSet) => assertExaminer.probe(stepExecutionResultSet));
	const arrangeExaminer = examineStepFactory(ProofStep.arrange, proof[ProofStep.arrange], (stepExecutionResultSet) => actExaminer.probe(stepExecutionResultSet));
	const annulExaminer = examineStepFactory(ProofStep.annul, proof[ProofStep.annul], (stepExecutionResultSet) => endStepExaminer.probe(stepExecutionResultSet));
	return new StepExaminerEnvelope((stepExecutionResultSet) => arrangeExaminer.probe(stepExecutionResultSet), (stepExecutionResultSet) => annulExaminer.probe(stepExecutionResultSet));
};