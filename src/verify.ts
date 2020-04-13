import { ProofExaminationResult } from "./";
import { examineProof } from "./examination";
import { Proof } from "./proof";
import { timedAsyncCall, TimedResult } from "./timing";

export const verify = async (proof: Proof): Promise<TimedResult<ProofExaminationResult>> =>
{
	return await timedAsyncCall(() => examineProof(proof));
};