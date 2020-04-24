import { ExaminationOutcomeObserved, ProofExaminationResult, TimedResult, verify } from "@premiss/api";
import { proofs } from "./proofs";

const createLogMessage = (testName: string, timedResult: TimedResult<ProofExaminationResult>): string =>
{
	return timedResult.result.examinationOutcome == ExaminationOutcomeObserved.passed
		? `${testName} passed in ${timedResult.elapsedNanoseconds} nanoseconds, total step time ${timedResult.result.examinationResultSet.elapsedNanoseconds} nanoseconds`
		: `${testName} failed at ${timedResult.result.examinationError.proofStep} with error: ${(timedResult.result.examinationError.error as Error).message}`;
};

const executeTests = async (): Promise<void> =>
{
	let totalProofTime = BigInt(0);
	let totalStepTime = BigInt(0);
	for (const proof of proofs)
	{
		const result = await verify(proof);
		totalProofTime += result.elapsedNanoseconds;
		totalStepTime += result.result.examinationResultSet.elapsedNanoseconds;
		const logMessage = createLogMessage(proof.constructor.name, result);
		console.log(logMessage);
	}
	console.log(`Total test time ${totalProofTime}, total step time ${totalStepTime}`);
};

executeTests()
	.then(() => { process.exit(0); })
	.catch((reason: unknown) => { console.log(reason); process.exit(1);});