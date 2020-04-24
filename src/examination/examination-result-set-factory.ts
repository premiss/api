import { ExaminationResult, ExaminationResultSet } from "./";
import { ProofStep } from "../proof";
import { TimedResult } from "../timing";

export const examinationResultSetFactory = (examinationResultSet: ExaminationResultSet, proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): ExaminationResultSet =>
{
	const elapsedNanoseconds = examinationResultSet.elapsedNanoseconds + timedExaminationResult.elapsedNanoseconds;
	return { ...examinationResultSet, elapsedNanoseconds, [proofStep]: timedExaminationResult };
};