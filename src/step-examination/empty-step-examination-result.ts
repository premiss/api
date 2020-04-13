import { ExaminationResult } from "../examination";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";
import { StepExaminationResultSet } from "./";

const emptyExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: false, examinationError: undefined }
	};

export const emptyStepExaminationResultSet: StepExaminationResultSet =
	{
		[ProofStep.arrange]: emptyExaminationResult,
		[ProofStep.act]: emptyExaminationResult,
		[ProofStep.assert]: emptyExaminationResult,
		[ProofStep.annul]: emptyExaminationResult
	};