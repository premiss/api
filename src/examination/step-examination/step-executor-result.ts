import { ExaminationResult } from "../../examination-result";
import { TimedResult } from "../../timing";
import { StepExaminer } from "./.";

export interface StepExecutorResult
{
	readonly examinationResult: TimedResult<ExaminationResult>;
	readonly nextStepExaminer: StepExaminer;
}