import { StepExaminer } from "./step-examiner";
import { StepExaminationResultSet } from "./step-examination-result-set";

export class StepExaminerEnvelope implements StepExaminer
{
	constructor(private readonly innerExaminer: StepExaminer, private outerExaminer: StepExaminer)
	{
	}

	public async probe(stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>
	{
		stepExaminationResultSet = await this.innerExaminer.probe(stepExaminationResultSet);
		return this.outerExaminer.probe(stepExaminationResultSet);
	}
}