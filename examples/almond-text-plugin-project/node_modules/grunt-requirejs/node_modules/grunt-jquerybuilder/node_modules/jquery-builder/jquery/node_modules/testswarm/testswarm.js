var request = require( "request" ),
	querystring = require( "querystring" ).stringify,
	url = require( "url" );

function extend( a, b ) {
	for (var key in b) {
		a[key] = b[key];
	}
	return a;
}

function baseUrl( config ) {
	// make sure there's always a trailing slash
	return url.format( config.urlParts).replace( /\/$/, "" ) + "/";
}

function continueRunning( job ) {
	return job.runs.filter(function( run ) {
		return Object.keys(run.uaRuns).filter(function( uaRun ) {
			return (/new|progress/).test( run.uaRuns[ uaRun ].runStatus );
		}).length;
	}).length;
}

function runStats( uaID, uaRun ) {
	var base = uaID + ": " + uaRun.runStatus;
	if ( uaRun.runResultsUrl ) {
		base +=  " (" + uaRun.runResultsLabel + ")" + ": " + uaRun.runResultsUrl;
	}
	return base;
}

function logResults( config, job, state ) {
	var passed = true;
	console.log( "Job " + job.jobInfo.id + ":\n\t" + job.jobInfo.name + "\nState:\n\t" + state );
	console.log( "\nResults: " );
	job.runs.filter(function( run ) {
		var uaID;
		console.log( "\n - " + run.info.name + ":" );
		for ( uaID in run.uaRuns ) {
			console.log( runStats( uaID, run.uaRuns[uaID] ) );
			// "new", "failed", "error", "timedout", ..
			if ( run.uaRuns[uaID].runStatus !== "passed" ) {
				passed = false;
			}
		}
	});
	config.done( passed );
}

function pollResults( config, job ) {
	process.stdout.write( "." );
	request.get( baseUrl( config ) + "api.php?" + querystring({
		action: "job",
		item: job.id
	}), function ( error, response, body ) {
		if ( error ) {
			throw error;
		}
		var result = JSON.parse( body );
		if ( !result.job ) {
			console.log( "API returned error, can't continue. Response was: " + body );
			config.done( false );
			return;
		}
		if ( continueRunning( result.job ) ) {
			if ( config.started + config.timeout < +new Date() ) {
				process.stdout.write( "\n\n" );
				logResults( config, result.job, "Timed out after " + config.timeout + 'ms' );
			}
			setTimeout(function () {
				pollResults( config, job );
			}, config.pollInterval );
		} else {
			process.stdout.write( "\n\n" );
			logResults( config, result.job, "Finished" );
		}
	});
}

module.exports = function ( config, addjobParams ) {
	config = extend({
		// default config
		// url: {String} required, no default
		// done: {Function} required, no default
		pollInterval: 5000,
		// 15 minutes
		timeout: 1000 * 60 * 15,
		started: +new Date(),
		urlParts: url.parse( config.url )
	}, config);
	addjobParams = extend(addjobParams, {
		action: "addjob"
	});
	request.post( baseUrl( config ) + "api.php?" + querystring( addjobParams ), function ( error, response, body ) {
		var result, jobInfo;
		if ( error ) {
			throw error;
		}
		result = JSON.parse( body );
		if ( !result.addjob ) {
			console.log( "API returned error, can't continue. Response was: " + body );
			config.done( false );
			return;
		}
		jobInfo = result.addjob;
		console.log( "Submited job " + jobInfo.id + " " + baseUrl( config ) + "job/" + jobInfo.id );
		process.stdout.write( "Polling for results" );
		pollResults( config, jobInfo );
	});

};
