import { ExamResult, Proof } from "./";
import { examResultFactory } from "./exam-result-factory";
import { stepExaminerChainFactory } from "./step-execution";

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	return await examResultFactory(stepExaminerChain);
};