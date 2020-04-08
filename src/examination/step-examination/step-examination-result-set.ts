import { ExaminationResult, ProofStep } from "../../index";
import { TimedResult } from "../../timing";

export interface StepExaminationResultSet
{
	readonly [ProofStep.arrange]: TimedResult<ExaminationResult>;
	readonly [ProofStep.act]: TimedResult<ExaminationResult>;
	readonly [ProofStep.assert]: TimedResult<ExaminationResult>;
	readonly [ProofStep.annul]: TimedResult<ExaminationResult>;
}