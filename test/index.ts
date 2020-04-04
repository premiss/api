import { coreTestRunner } from "./core-tests";

coreTestRunner().then(() =>
{
	process.exit(0);
}).catch((reason: unknown) =>
{
	console.log(reason);
	process.exit(1);
});