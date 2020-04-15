import { ExaminationResult, Examine } from "../examination";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";
import { ExaminationResultSet } from "./";

const skippedExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: true, examinationError: undefined }
	};

export const examineStepSkipFactory = (proofStep: ProofStep, nextStepExamine: Examine) =>
{
	return async (examinationResultSet: ExaminationResultSet): Promise<ExaminationResultSet> =>
	{
		return await nextStepExamine({ ...examinationResultSet, [proofStep]: skippedExaminationResult });
	};
};