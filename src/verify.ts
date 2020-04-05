import { ExamResult, Proof, timedAsyncCall, TimedResult } from "./";
import { examResultFactory } from "./exam-result-factory";
import { stepExaminerChainFactory } from "./step-execution";

export const verify = async (proof: Proof): Promise<TimedResult<ExamResult>> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	return await timedAsyncCall(() => examResultFactory(stepExaminerChain));
};