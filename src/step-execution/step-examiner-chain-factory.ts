import { Proof, ProofStep, ProofStepSignature } from "../";
import { StepExaminer } from "./";
import { endStepExaminer } from "./end-step-examiner";
import { SkipStepExaminer } from "./skip-step-examiner";
import { StepExaminerEnvelope } from "./step-examiner-envelope";
import { StepExecutor } from "./step-executor";

const stepExaminerFactory = (proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExaminer: StepExaminer): StepExaminer =>
{
	return proofStepSignature
		? new StepExecutor({ proofStep, proofStepSignature }, nextStepExaminer)
		: new SkipStepExaminer(proofStep, nextStepExaminer);
};

export const stepExaminerChainFactory = (proof: Proof): StepExaminer =>
{
	const assertExaminer = stepExaminerFactory(ProofStep.assert, proof[ProofStep.assert], endStepExaminer);
	const actExaminer = stepExaminerFactory(ProofStep.act, proof[ProofStep.act], assertExaminer);
	const arrangeExaminer = stepExaminerFactory(ProofStep.arrange, proof[ProofStep.arrange], actExaminer);
	const annulExaminer = stepExaminerFactory(ProofStep.annul, proof[ProofStep.annul], endStepExaminer);
	return new StepExaminerEnvelope(arrangeExaminer, annulExaminer);
};