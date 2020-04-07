import { ExaminationResult, ProofStep, TimedResult } from "../../index";
import { StepExecutionResultSet } from "./.";

export const stepExecutionResultSetFactory = (stepExecutionResultSet: StepExecutionResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): StepExecutionResultSet =>
{
	return { ...stepExecutionResultSet, [proofStep]: timedExaminationResult };
};