import { ProofStepSignature, StepExecutor } from "./";

export class StepExecutorFactory
{
	public create(step: ProofStepSignature): Readonly<StepExecutor>
	{
		return new StepExecutor(step);
	}
}