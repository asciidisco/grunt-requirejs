# testswarm

Nodejs module for interacting with TestSwarm

## Getting Started
Install the module with: `npm install testswarm`.

See [addjob README](https://github.com/jquery/testswarm/tree/master/scripts/addjob#fields) in the TestSwarm repository for what parameters the addjob API takes.

```javascript
var testswarm = require('testswarm');
var myCode = "http://localhost/jquery-ui-checkout";
testswarm( {
	// base url for testswarm server
	url: "http://localhost/testswarm/",
	// how often to job status (in milliseconds)
	pollInterval: 1000,
	// time out (in milliseconds)
	timeout: 1000 * 60 * 15, // 15 minutes
	done: function( passed ) {
		process.exit( passed ? 0 : 1 );
	}
}, {
	authUsername: "swarmuser",
	authToken: "yourauthtoken",
	jobName: "node-testswarm test job",
	runMax: 4,
	"runNames[]": ["Accordion", "Autocomplete"],
	"runUrls[]": [ myCode + "/tests/unit/accordion/accordion.html", myCode + "/tests/unit/autocomplete/autocomplete.html" ],
	"browserSets[]": ["popular"]
});
```

For local testing, make a copy of `test.js`, name it `local-test.js` (in .gitignore) and modify to match your local TestSwarm setup.

## Release History
* 0.2.0 Global timeout, check all uaRuns, proper URLs back to TestSwarm, some additional error handling
* 0.1.1 fix engine property in package.json
* 0.1.0 first release

## License
Copyright (c) 2012 Jörn Zaefferer
Licensed under the MIT license.
