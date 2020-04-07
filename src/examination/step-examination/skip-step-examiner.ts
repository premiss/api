import { ExecutionResult, TimedResult } from "../../index";
import { ProofStep } from "../../proof-step";
import { StepExaminer, StepExecutionResultSet } from "./.";

const skippedExecutionResult: TimedResult<ExecutionResult> =
	{
		elapsedNanoseconds: BigInt(0),
		result: { passed: true, examinationError: undefined }
	};

export class SkipStepExaminer implements StepExaminer
{
	constructor(private readonly proofStep: ProofStep, private readonly nextStepExaminer: StepExaminer)
	{
	}

	public async probe(stepExecutionResultSet: StepExecutionResultSet): Promise<StepExecutionResultSet>
	{
		return await this.nextStepExaminer.probe({ ...stepExecutionResultSet, [this.proofStep]: skippedExecutionResult });
	}
}