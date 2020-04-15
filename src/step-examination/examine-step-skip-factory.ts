import { ExaminationOutcome, ExaminationResult, ExaminationResultSet, Examine } from "../examination";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";

const skippedExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { examinationOutcome: ExaminationOutcome.Skipped, examinationError: undefined }
	};

export const examineStepSkipFactory = (proofStep: ProofStep, nextStepExamine: Examine) =>
{
	return async (examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		return await nextStepExamine({ ...examinationResultSet, [proofStep]: skippedExaminationResult });
	};
};