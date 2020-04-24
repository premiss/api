import { ProofStep } from "../proof";
import { TimedResult } from "../timing";
import { ExaminationResult } from "./";

export interface ExaminationResultSet
{
	readonly [ProofStep.arrange]: TimedResult<ExaminationResult>;
	readonly [ProofStep.act]: TimedResult<ExaminationResult>;
	readonly [ProofStep.assert]: TimedResult<ExaminationResult>;
	readonly [ProofStep.annul]: TimedResult<ExaminationResult>;
	readonly elapsedNanoseconds: bigint;
}