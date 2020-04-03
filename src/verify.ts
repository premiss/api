import { ExamResult, examResultFactory, Proof, stepExaminerChainFactory } from "./";

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	return await examResultFactory(stepExaminerChain);
};