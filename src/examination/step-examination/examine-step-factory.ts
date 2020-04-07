import { ProofStep } from "../../proof-step";
import { ProofStepSignature } from "../../proof-step-signature";
import { Examine } from "../examine";
import { examineStepExecutionFactory } from "./examine-step-execution-factory";
import { examineStepSkipFactory } from "./examine-step-skip-factory";

export const examineStepFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExamine: Examine): Examine =>
{
	return proofStepSignature
		? examineStepExecutionFactory({ proofStep, proofStepSignature }, nextStepExamine)
		: examineStepSkipFactory(proofStep, nextStepExamine);
};