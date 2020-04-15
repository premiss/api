import { emptyExaminationResultSet, ExaminationOutcome } from "../examination";
import { Proof, proofExaminationErrorFactory, ProofExaminationResult, proofExamineFactory, proofPassedFactory } from "./";

const examinationOutcomeFactory = (passed: boolean): ExaminationOutcome =>
{
	return passed ? ExaminationOutcome.Passed : ExaminationOutcome.Failed;
};

export const examineProof = async (proof: Proof): Promise<ProofExaminationResult> =>
{
	const examine = proofExamineFactory(proof);
	const examinationResultSet = await examine(emptyExaminationResultSet);
	const passed = proofPassedFactory(examinationResultSet);
	const examinationOutcome = examinationOutcomeFactory(passed);
	const examinationError = proofExaminationErrorFactory(examinationResultSet);
	return { examinationOutcome, passed, examinationError, examinationResultSet: examinationResultSet };
};