import { ProofStep } from "../proof-step";
import { StepExaminer, ExecutionResult, StepExecutionResultSet } from "./";

const skippedExecutionResult: ExecutionResult = {
	passed: true,
	elapsedNanoseconds: BigInt(0),
	stepExecutionError: undefined
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