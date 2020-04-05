module.exports = {
	extends: "@istanbuljs/nyc-config-typescript",
	all: true,
	include: [
		"src/**"
	],
	"check-coverage": true,
	"branches": 100,
	"lines": 100,
	"functions": 100,
	"statements": 100,
	reporter: ["text", "text-summary", "html"]
};