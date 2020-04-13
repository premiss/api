import { ProofExaminationResult } from "../";
import { emptyStepExaminationResultSet } from "../step-examination";
import { Proof, proofExaminationErrorFactory, proofExamineFactory, proofPassedFactory } from "./";

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = proofExamineFactory(proof);
	const stepExaminationResultSet = await examine(emptyStepExaminationResultSet);
	const passed = proofPassedFactory(stepExaminationResultSet);
	const examinationError = proofExaminationErrorFactory(stepExaminationResultSet);
	return { passed, examinationError, stepExaminationResultSet };
};