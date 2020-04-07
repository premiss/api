import { Examine } from "../examine";
import { StepExaminer } from "./step-examiner";
import { StepExaminationResultSet } from "./step-examination-result-set";

export class StepExaminerEnvelope implements StepExaminer
{
	constructor(private readonly innerExamine: Examine, private outerExamine: Examine)
	{
	}

	public async probe(stepExaminationResultSet: StepExaminationResultSet): Promise<StepExaminationResultSet>
	{
		stepExaminationResultSet = await this.innerExamine(stepExaminationResultSet);
		return this.outerExamine(stepExaminationResultSet);
	}
}