'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CONFIG ===================================/

		// Config for grunt-autoprefixer (avoid unnecessary mixin usage)

		autoprefixer: {
			options: {
				safe: true,
				map: true,
				browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'styles',
					src: '{,*/}*.css',
					dest: 'styles',
					ext: '.css'
				}]
			}
		},


		// Config for grunt-libsass (Lacks compass, <1s compiling time)

		sass: {
			options: {
				style: 'compressed'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'styles',
					src: '{,*/}*.scss',
					dest: 'styles',
					ext: '.css'
				}]
			}
		},


		// Config for grunt-contrib-uglify (javascript concatenation)

		uglify: {
			all: {
				files: {
					'scripts/build.js': [
						'scripts/core/vendor/jquery-1.11.2.min.js',
						'scripts/core/vendor/modernizr-full.min.js',
						'scripts/core/vendor/*.js',
						'scripts/dev/config.js',
						'scripts/core/**/*.js',
						'scripts/core/*.js',
						'scripts/dev/**/*.js',
						'scripts/dev/*.js'
					]
				}
			},
			options: {
				beautify: false,
				sourceMap: true,
				sourceMapIncludeSources: true,
				sourceMapName: 'scripts/build.js.map'
			}
		},


		// Config for grunt-contrib-watch (javascript concatenation)

		watch: {
			html: {
				files: ['**/*.html'],
				options: { livereload: true	}
			},
			php: {
				files: ['**/*.php'],
				options: { livereload: true	}
			},
			css: {
				files: ['styles/*.css'],
				options: { livereload: true	}
			},
			sass: {
				files: ['styles/*.{scss,sass}', 'styles/**/*.{scss,sass}'],
				tasks: ['sass:dist', 'autoprefixer'],
				options: {
					livereload: false
				}
			},
			js: {
				files: ['scripts/**/*.js', '!scripts/*.js'],
				tasks: ['uglify'],
				options: { livereload: true	}
			}
		}
	});


	// DEPENDENT PLUGINS =========================/

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// TASKS =====================================/

	grunt.registerTask('default', ['watch']);
};