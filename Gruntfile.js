module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-jshint');
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
		jshint: {
			all: ['scripts/classes.js', 'scripts/data.js', 'scripts/helpers.js', 'scripts/questions.js', ],
			options: {
				jshintrc: '.jshintrc',
			}
		},
		watch:{
			css: {
				files: 'sass/*',
				tasks: ['sass']
			},
			js: {
				files: ['scripts/*'],
				tasks: ['js']
			}
		},
		sass:{
			dist:{
				files:[{
					expand: true,
					cwd: 'sass',
					src: ['*.scss'],
					dest: 'public/stylesheets',
					ext: '.css'
				}]
			}
		},
		babel:{
			options: {
				presets: ['es2015']
			},
			dist: {
				files: {
					"tests/src/helpers.js" : "scripts/helpers.js"
				}
			}
		},
		jasmine: {
			src: 'tests/src/*.js',
			options: {
				specs: 'tests/specs/*.js',
			}
		}
	});
	grunt.registerTask('js', ['browserify']);
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['jshint', 'browserify', 'sass']);
	grunt.registerTask('tests', ['babel', 'jasmine']);
}