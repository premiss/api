import { Isochronon, StepExaminer } from "./";

export class SkipStepExaminer implements StepExaminer
{
	constructor(private nextStepExaminer: StepExaminer)
	{
	}

	public async probe(isochronon: Readonly<Isochronon>): Promise<void>
	{
		await this.nextStepExaminer.probe(isochronon);
	}
}