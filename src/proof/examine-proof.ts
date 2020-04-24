import { emptyExaminationResultSet, ExaminationOutcomeObserved } from "../examination";
import { Proof, proofExaminationErrorFactory, ProofExaminationResult, proofExamineFactory } from "./";

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = proofExamineFactory(proof);
	const examinationResultSet = await examine(emptyExaminationResultSet);
	const examinationError = proofExaminationErrorFactory(examinationResultSet);
	return examinationError
		? { examinationOutcome: ExaminationOutcomeObserved.failed, examinationError, examinationResultSet }
		: { examinationOutcome: ExaminationOutcomeObserved.passed, examinationError, examinationResultSet };
};