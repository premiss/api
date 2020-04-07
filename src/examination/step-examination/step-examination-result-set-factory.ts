import { ExaminationResult, ProofStep, TimedResult } from "../../index";
import { StepExaminationResultSet } from "./.";

export const stepExaminationResultSetFactory = (stepExaminationResultSet: StepExaminationResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): StepExaminationResultSet =>
{
	return { ...stepExaminationResultSet, [proofStep]: timedExaminationResult };
};