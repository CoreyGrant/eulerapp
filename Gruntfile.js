module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify:{
			dist: {
				options: {
					transform: [["babelify"]],
					browserifyOptions: {
						debug: true
					}
				},
				files: {
					"public/javascripts/eulerApp.js": "scripts/app.js"
				}
			}
		},
		watch:{
			files: 'scripts/*',
			tasks: ['default']
		}
	});
	grunt.registerTask('default', ['browserify']);
}