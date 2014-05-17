/*jshint laxbreak: true, node: true, undef: true, unused: true */

'use strict';

var csv = require('csv')(),
	FS = require('fs'),
	Path = require('path'),

	usage = [
		'Usage: ' + Path.basename(__filename) + ' [ path/to/file.csv ]',
		'',
		'Pass CSV input to stdin or provide a path to a CSV file to read.',
		''
	].join("\n"),

	readOptions = {
		columns: ['Date', 'Type', 'Check', 'Payee', 'Amount', 'Daily']
	},

	// Find all parenthesis and dollar signs.
	amountScrubRegExp = /[($)]/g,

	// Absolute path to read from.
	filePath;

process.stdin.setEncoding('utf8');

if (process.argv.length > 2) {
	if (/--h(elp)?/.test(process.argv[2])) {
		console.log(usage);
		process.exit(0);
	} else{
		filePath = FS.realpathSync(process.argv[2]);
		csv.from.path(filePath, readOptions);
	}
} else {
	csv.from.stream(process.stdin, readOptions);
}

csv.transform(function (row) {
	// Skip header row.
	if (row.Amount === 'Amount') {
		return null;
	}

	var result, scrubbedAmount;

	result = { 'Date': row.Date, Payee: row.Payee, Category: '', Memo: '' };

	// Strip parenthesis and dollar signs.
	scrubbedAmount = row.Amount.replace(amountScrubRegExp, '');

	// Negative Amounts are Outflow, positive are Inflow.
	if (row.Amount.indexOf('(') === 0) {
		result.Outflow = scrubbedAmount;
	} else {
		result.Inflow = scrubbedAmount;
	}

	return result;
})
.to.stream(process.stdout, {
	header: true,
	columns: ['Date','Payee','Category','Memo','Outflow','Inflow']
});
