import { StepExaminer } from "./step-examiner";
import { StepExecutionResultSet } from "./step-execution-result-set";

export class StepExaminerEnvelope implements StepExaminer
{
	constructor(private readonly innerExaminer: StepExaminer, private outerExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		stepExecutionResultSet = await this.innerExaminer.probe(stepExecutionResultSet);
		return this.outerExaminer.probe(stepExecutionResultSet);
	}
}