import { ProofStep } from "../proof-step";
import { TimedResult } from "../timing";
import { ExaminationResult } from "../examination/examination-result";
import { Examine } from "../examination/examine";
import { StepExaminationResultSet } from "./index";

const skippedExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: true, examinationError: undefined }
	};

export const examineStepSkipFactory = (proofStep: ProofStep, nextExamineStep: Examine) =>
{
	return async (stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet> =>
	{
		return await nextExamineStep({ ...stepExaminationResultSet, [proofStep]: skippedExaminationResult });
	};
};