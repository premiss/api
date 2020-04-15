import { emptyExaminationResultSet } from "../examination";
import { Proof, proofExaminationErrorFactory, ProofExaminationResult, proofExamineFactory, proofPassedFactory } from "./";

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = proofExamineFactory(proof);
	const examinationResultSet = await examine(emptyExaminationResultSet);
	const passed = proofPassedFactory(examinationResultSet);
	const examinationError = proofExaminationErrorFactory(examinationResultSet);
	return { passed, examinationError, examinationResultSet: examinationResultSet };
};