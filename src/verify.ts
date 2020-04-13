import { ProofExaminationResult } from "./";
import { examineProof, Proof } from "./proof";
import { timedAsyncCall, TimedResult } from "./timing";

export const verify = async (proof: Proof): Promise<TimedResult<ProofExaminationResult>> =>
{
	return await timedAsyncCall(() => examineProof(proof));
};