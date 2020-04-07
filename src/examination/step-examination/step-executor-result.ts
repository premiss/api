import { TimedResult } from "../../timing";
import { ExaminationResult } from "../examination-result";
import { Examine } from "../examine";

export interface StepExecutorResult
{
	readonly examinationResult: TimedResult<ExaminationResult>;
	readonly nextStepExamine: Examine;
}