import { ProofExaminationResult, Proof, timedAsyncCall, TimedResult } from "./";
import { examineProof } from "./examination/examine-proof";
import { stepExaminerChainFactory } from "./examination/step-examination";

export const verify = async (proof: Proof): Promise<TimedResult<ProofExaminationResult>> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	return await timedAsyncCall(() => examineProof(stepExaminerChain));
};