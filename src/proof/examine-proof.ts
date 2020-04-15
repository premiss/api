import { emptyExaminationResultSet } from "../examination";
import { Proof, proofExaminationErrorFactory, ProofExaminationResult, proofExamineFactory, proofOutcomeFactory } from "./";

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = proofExamineFactory(proof);
	const examinationResultSet = await examine(emptyExaminationResultSet);
	const examinationOutcome = proofOutcomeFactory(examinationResultSet);
	const examinationError = proofExaminationErrorFactory(examinationResultSet);
	return { examinationOutcome, examinationError, examinationResultSet } as ProofExaminationResult;
};