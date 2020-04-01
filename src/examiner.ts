import { emptyExamResult, ExamResult, Proof, Registrar, StepExaminerChainFactory, timedAsyncCall } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly stepExaminerChainFactory: Readonly<StepExaminerChainFactory>)
	{
	}

	public async probe(proof: Readonly<Proof>): Promise<void>
	{
		const examResult = await this.executeSteps(proof);
		await this.registrar.record(examResult);
	}

	private async executeSteps(proof: Readonly<Proof>): Promise<Readonly<ExamResult>>
	{
		const stepExaminerChain = this.stepExaminerChainFactory.create(proof);
		const timedResult = await timedAsyncCall(() => stepExaminerChain.probe(emptyExamResult));
		return { ...timedResult.result, elapsedNanoseconds: timedResult.elapsedNanoSeconds };
	}
}