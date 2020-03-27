import { emptyAsyncVoid } from "./empty-async-void";
import { ProofStepSignature } from "./proof-step-signature";
import { StepExecutor } from "./step-executor";

export class StepExecutorFactory
{
	public create(step: ProofStepSignature | undefined = emptyAsyncVoid): StepExecutor
	{
		return new StepExecutor(step);
	}
}