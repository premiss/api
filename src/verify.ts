import { ExamResult, examResultFactory, Proof } from "./";
import { stepExaminerChainFactory } from "./step-execution";

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	return await examResultFactory(stepExaminerChain);
};