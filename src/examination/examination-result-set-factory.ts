import { ExaminationResult, ExaminationResultSet } from "./";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";

export const examinationResultSetFactory = (examinationResultSet: ExaminationResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): ExaminationResultSet =>
{
	return { ...examinationResultSet, [proofStep]: timedExaminationResult };
};