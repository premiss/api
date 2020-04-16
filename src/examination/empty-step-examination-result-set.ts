import { ExaminationOutcome, ExaminationResult, ExaminationResultSet } from "./index";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";

const emptyExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { examinationOutcome: ExaminationOutcome.Unknown, examinationError: undefined }
	};

export const emptyExaminationResultSet: ExaminationResultSet =
	{
		[ProofStep.arrange]: emptyExaminationResult,
		[ProofStep.act]: emptyExaminationResult,
		[ProofStep.assert]: emptyExaminationResult,
		[ProofStep.annul]: emptyExaminationResult
	};