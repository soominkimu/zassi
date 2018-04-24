'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		// Watch task config
		watch: {
			sass: {
				// watch only sass files (no css output)
				files: "sass/**",
				tasks: ['sass', 'postcss']
			}
		},
		// SASS task config
		sass: {
			options: {
				sourceMap: false
			},
			dev: {
				files: {
					// destination : source file
					"css/styles.css" : "sass/styles.scss"
				}
			}
		},
		// Post CSS
		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')({browsers: ['last 1 version']})
				]
			},
			dist: {
				src: 'css/*.css'
			}
		},
		// Browser
		browserSync: {
			default_options: {
				bsFiles: {
					src: [
						"*.html",
						"css/*.css",
						"images/**"
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: "./"
					}
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					src: ['css/*.css'],
					dest: 'dist',
					ext: '.css'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html': 'index.html'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// Launch BrowserSync + watch task
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', ['sass', 'postcss', 'cssmin', 'htmlmin']);
};
