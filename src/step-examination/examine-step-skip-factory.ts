import { ExaminationOutcomeUnobserved, ExaminationResult, ExaminationResultSet, examinationResultSetFactory, Examine } from "../examination";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";

const skippedExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { examinationOutcome: ExaminationOutcomeUnobserved.skipped, examinationError: undefined }
	};

export const examineStepSkipFactory = (proofStep: ProofStep, nextStepExamine: Examine) =>
{
	return async (examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		const nextExaminationResultSet = examinationResultSetFactory(examinationResultSet, proofStep, skippedExaminationResult);
		return await nextStepExamine(nextExaminationResultSet);
	};
};