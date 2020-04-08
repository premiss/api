import { ProofStep } from "../../proof-step";
import { TimedResult } from "../../timing";
import { ExaminationResult } from "../examination-result";
import { StepExaminationResultSet } from "./step-examination-result-set";

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