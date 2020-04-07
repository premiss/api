import { ProofExaminationResult, Proof, timedAsyncCall, TimedResult } from "./";
import { examineProof } from "./examination/examine-proof";

export const verify = async (proof: Proof): Promise<TimedResult<ProofExaminationResult>> =>
{
	return await timedAsyncCall(() => examineProof(proof));
};