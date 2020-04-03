import { ExamResult, examResultFactory, Proof, StepExaminer, stepExaminerChainFactory } from "./";

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain: StepExaminer = stepExaminerChainFactory(proof);
	return await examResultFactory(stepExaminerChain);
};