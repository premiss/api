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
		const examResult: ExamResult = { ...emptyExamResult };
		const stepExaminerChain = this.stepExaminerChainFactory.create(proof, examResult);
		const timedResult = await timedAsyncCall(() =>  stepExaminerChain.probe());
		examResult.elapsedNanoseconds = timedResult.elapsedNanoSeconds;
		return examResult;
	}
}