const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const package = require('./package.json');
const {name, version} = package;

const paths = {
	source: './{Constants,Handlers,HTML,Standard,Patterns}/**/*[^test].js',
	tests: './{Constants,Handlers,HTML,Standard,Patterns}/**/*test.js',
	build: 'build',
	doc: 'doc',
};

gulp.task('clean', () => {
	const del = require('del');
	return del([paths.build, paths.doc]);
});

gulp.task('build', () => {
	return gulp.src(paths.source)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.build));
});


gulp.task('docs:md', function () {
	const gulpDocumentation = require('gulp-documentation');
	return gulp.src(paths.source)
		.pipe(gulpDocumentation('md', {}, {name, version}))
		.pipe(gulp.dest(paths.doc));
});

gulp.task('docs:html', function () {
	const gulpDocumentation = require('gulp-documentation');
	return gulp.src(paths.source)
		.pipe(gulpDocumentation('html', {}, {name, version}))
		.pipe(gulp.dest(paths.doc));
});

gulp.task('test', function () {
	const run = require('gulp-run');
	return gulp.src('./package.json')
		.pipe(run('npm run test'));
});

gulp.task('test:copy', function () {
	return gulp.src(paths.tests)
		.pipe(gulp.dest(paths.build))
		;
});

gulp.task('test:build', gulp.parallel('test:copy', function () {
	const run = require('gulp-run');
	return gulp.src('./package.json')
		.pipe(run('npm run test:build'));
}));

gulp.task('test:copy&test:build', gulp.series('test:copy', 'test:build'));

gulp.task("watch:test", () => {
	const watcher = gulp.watch(paths.source, gulp.series('clean', 'build', 'test:copy&test:build'));
	watcher.on('change', function (path, stats) {
		console.log('File ' + path + ' was changed');
	});
	return watcher;
});

gulp.task("watch:docs", () => {
	const watcher = gulp.watch(paths.source, gulp.series('docs:html'));
	watcher.on('change', function (path, stats) {
		console.log('File ' + path + ' was changed');
	});
	return watcher;
});

gulp.task('default', gulp.parallel('build'));
