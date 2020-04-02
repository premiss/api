import { StepExecutionError } from "./";

export type StepExecuteResult = Readonly<{ passed: boolean; stepExecutionError: StepExecutionError | undefined; }>