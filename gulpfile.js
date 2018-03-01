const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

const {name, version} = require('./package.json');

const paths = {
	source: './_source/**/!(*test).js',
	tests: './_source/**/*test.js',
	build: './',
	clear: ['index.js', 'index.js.map', 'Constants', 'HTML', 'Node', 'Standard', 'Patterns'],
	doc: '_doc',
};

gulp.task('clean', () => {
	const del = require('del');
	return del([...paths.clear, paths.doc]);
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

gulp.task("watch:build:test", () => {
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
