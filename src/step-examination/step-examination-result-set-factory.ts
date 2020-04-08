import { ProofStep } from "../";
import { ExaminationResult } from "../examination";
import { TimedResult } from "../timing";
import { StepExaminationResultSet } from "./";

export const stepExaminationResultSetFactory = (stepExaminationResultSet: StepExaminationResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): StepExaminationResultSet =>
{
	return { ...stepExaminationResultSet, [proofStep]: timedExaminationResult };
};