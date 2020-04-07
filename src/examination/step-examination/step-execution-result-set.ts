import { ProofStep, ExaminationResult, TimedResult } from "../../index";

export interface StepExecutionResultSet
{
	readonly [ProofStep.arrange]: TimedResult<ExaminationResult>;
	readonly [ProofStep.act]:  TimedResult<ExaminationResult>;
	readonly [ProofStep.assert]:  TimedResult<ExaminationResult>;
	readonly [ProofStep.annul]:  TimedResult<ExaminationResult>;
}