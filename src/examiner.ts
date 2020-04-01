import { emptyExamResult, ExamResult, IsochrononFactory, Proof, Registrar, StepExaminerChainFactory } from "./";

export class Examiner
{
	constructor(private readonly registrar: Readonly<Registrar>, private readonly isochrononFactory: Readonly<IsochrononFactory>, private readonly stepExaminerChainFactory: Readonly<StepExaminerChainFactory>)
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
		const isochronon = this.isochrononFactory.createIsochronon();
		const stepExaminerChain = this.stepExaminerChainFactory.create(proof, examResult);
		await stepExaminerChain.probe();
		examResult.elapsedNanoseconds = isochronon.getElapsedNanoseconds();
		return examResult;
	}
}