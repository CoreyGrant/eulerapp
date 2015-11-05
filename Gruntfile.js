module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-sass')
	
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
		}
	});
	grunt.registerTask('js', ['browserify']);
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['browserify', 'sass']);
}