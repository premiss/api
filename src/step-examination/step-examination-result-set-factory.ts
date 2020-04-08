import { ProofStep } from "../index";
import { TimedResult } from "../timing";
import { ExaminationResult } from "../examination/examination-result";
import { StepExaminationResultSet } from "./index";

export const stepExaminationResultSetFactory = (stepExaminationResultSet: StepExaminationResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): StepExaminationResultSet =>
{
	return { ...stepExaminationResultSet, [proofStep]: timedExaminationResult };
};