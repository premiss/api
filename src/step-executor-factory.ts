import { emptyAsyncVoid, ProofStepSignature, StepExecutor } from "./";

export class StepExecutorFactory
{
	public create(step: ProofStepSignature | undefined = emptyAsyncVoid): StepExecutor
	{
		return new StepExecutor(step);
	}
}