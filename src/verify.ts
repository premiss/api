import { ProofExaminationResult, Proof, timedAsyncCall, TimedResult } from "./";
import { examResultFactory } from "./exam-result-factory";
import { stepExaminerChainFactory } from "./examination/step-examination";

export const verify = async (proof: Proof): Promise<TimedResult<ProofExaminationResult>> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	return await timedAsyncCall(() => examResultFactory(stepExaminerChain));
};