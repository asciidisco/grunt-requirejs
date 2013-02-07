module.exports = function( grunt ) {

grunt.initConfig({
	lint: {
		files: [ "grunt.js", "tasks/**/*.js" ]
	}
});

grunt.registerTask( "default", "lint" );

};
