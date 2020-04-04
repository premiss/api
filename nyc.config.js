module.exports = {
	extends: "@istanbuljs/nyc-config-typescript",
	all: true,
	include: [
		"src/**"
	],
	exclude: [
		// interfaces
		"src/exam-result.ts",
		"src/proof-step-signature.ts",
		"src/proof.ts",
		"src/step-execution/step-examiner.ts",
		"src/step-execution/step-execution-error.ts",
		"src/step-execution/step-execution-result-set.ts",
		"src/step-execution/step-execution-result.ts",
		"src/step-execution/step-executor-result.ts",
		"src/step-execution/step-result.ts",
		"src/step-execution/subject.ts",
		"src/timing/timed-result.ts",
		// enum
		"src/proof-step.ts"
	],
	"check-coverage": true,
	"branches": 100,
	"lines": 100,
	"functions": 100,
	"statements": 100,
	reporter: ["text-summary", "html"]
};