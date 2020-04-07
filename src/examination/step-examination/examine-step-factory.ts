import { ProofStep } from "../../proof-step";
import { ProofStepSignature } from "../../proof-step-signature";
import { Examine } from "../examine";
import { examineStepSkipFactory } from "./examine-step-skip-factory";
import { StepExaminationResultSet } from "./step-examination-result-set";
import { StepExecutor } from "./step-executor";

export const examineStepFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExamine: Examine): Examine =>
{
	return proofStepSignature
		? (stepExaminationResultSet: StepExaminationResultSet) => (new StepExecutor({ proofStep, proofStepSignature }, nextStepExamine)).probe(stepExaminationResultSet)
		: examineStepSkipFactory(proofStep, nextStepExamine);
};