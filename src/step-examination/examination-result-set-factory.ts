import { ExaminationResult } from "../examination";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";
import { ExaminationResultSet } from "./";

export const examinationResultSetFactory = (stepExaminationResultSet: ExaminationResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): ExaminationResultSet =>
{
	return { ...stepExaminationResultSet, [proofStep]: timedExaminationResult };
};