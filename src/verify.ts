import { emptyStepExecutionResultSet, ExamResult, examResultFactory, Proof, stepExaminerChainFactory, timedAsyncCall } from "./";

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	const timedStepExecutionResult = await timedAsyncCall(() => stepExaminerChain.probe(emptyStepExecutionResultSet));
	return examResultFactory(timedStepExecutionResult);
};