const project_folder = "dist"
const source_folder = "src"

const path = {
	build: {
		html: project_folder + '/',
		css: project_folder + '/css/',
		js:  project_folder + '/js/',
		img: project_folder + '/img/',
	}, 
	scr: {
		html: source_folder + '/*.html',
		css: source_folder + '/scss/style.scss',
		js:  source_folder + '/js/script.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif}',
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/**/*.scss',
		js:  source_folder + '/js/**/*.js',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif}',
	}, 
	clean: './' + project_folder + '/'
}

const {src, dest, parallel} = require('gulp')
const gulp = require('gulp')
const browsersync = require('browser-sync').create()
const fileinclude = require('gulp-file-include')
const scss = require('gulp-sass')

const browserSync = (params) => {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: true
	})
}

const html = () => {
	return src(path.scr.html)
			.pipe(fileinclude())
			.pipe(dest(path.build.html))
			.pipe(browsersync.stream())
}

const css = () => {
	return src(path.scr.css)
			.pipe(scss({
				outputStyle: 'expanded'
			}))
			.pipe(dest(path.build.css))
			.pipe(browsersync.stream())
}

const js = () => {
	return src(path.scr.js)
			.pipe(fileinclude())
			.pipe(dest(path.build.js))
			.pipe(browsersync.stream())
}

const images = () => {
	return src(path.scr.img)
			.pipe(dest(path.build.img))
			.pipe(browsersync.stream())
}

const watchFiles = (params) => {
	gulp.watch([path.watch.html], html)
	gulp.watch([path.watch.css], css)
	gulp.watch([path.watch.js], js)
	gulp.watch([path.watch.img], images)
}

const build = gulp.series(parallel(css, html, js, images))
const watch = gulp.parallel(build, watchFiles, browserSync)

exports.images = images
exports.js = js
exports.css = css
exports.html = html
exports.build = build
exports.watch = watch 
exports.default = watch