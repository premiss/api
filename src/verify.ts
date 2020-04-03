import { ExamResult, examResultFactory, Proof, ProofStep, stepExaminerChainFactory, StepExecutionResult, StepExecutionResultSet, timedAsyncCall } from "./";

const emptyStepExecutionResult: StepExecutionResult =
	{
		passed: false,
		elapsedNanoseconds: BigInt(0),
		stepExecutionError: undefined
	};
const emptyStepExecutionResultSet: StepExecutionResultSet =
	{
		[ProofStep.arrange]: emptyStepExecutionResult,
		[ProofStep.act]: emptyStepExecutionResult,
		[ProofStep.assert]: emptyStepExecutionResult,
		[ProofStep.annul]: emptyStepExecutionResult
	};

export const verify = async (proof: Proof): Promise<ExamResult> =>
{
	const stepExaminerChain = stepExaminerChainFactory(proof);
	const timedStepExecutionResult = await timedAsyncCall(() => stepExaminerChain.probe(emptyStepExecutionResultSet));
	return examResultFactory(timedStepExecutionResult);
};