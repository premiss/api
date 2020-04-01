import { ProofStep, StepResult } from "./";

export type StepExecutionResult = Readonly<{ [Key in keyof typeof ProofStep]: StepResult }>;