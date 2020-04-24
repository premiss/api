import { ProofStep } from "../proof";
import { TimedResult } from "../timing";
import { ExaminationOutcomeUnobserved, ExaminationResult, ExaminationResultSet } from "./index";

const emptyExaminationResult: TimedResult<ExaminationResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { examinationOutcome: ExaminationOutcomeUnobserved.unknown, examinationError: undefined }
	};

export const emptyExaminationResultSet: ExaminationResultSet =
	{
		[ProofStep.arrange]: emptyExaminationResult,
		[ProofStep.act]: emptyExaminationResult,
		[ProofStep.assert]: emptyExaminationResult,
		[ProofStep.annul]: emptyExaminationResult
	};