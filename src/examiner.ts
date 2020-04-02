import { emptyStepExecutionResultSet, ExamResult, examResultFactory, Proof, Registrar, stepExaminerChainFactory, timedAsyncCall } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const examResult = await this.executeSteps(proof);
		await this.registrar.record(examResult);
	}

	private async executeSteps(proof: Readonly<Proof>): Promise<ExamResult>
	{
		const stepExaminerChain = stepExaminerChainFactory(proof);
		const timedStepExecutionResult = await timedAsyncCall(() => stepExaminerChain.probe(emptyStepExecutionResultSet));
		return examResultFactory(timedStepExecutionResult);
	}
}