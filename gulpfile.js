// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss)
    fileswatch = 'html, htm, txt, json, md, woff2', // List of files extensions for watching & hard reload (comma separated)
    imageswatch = 'jpg, jpeg, png, webp, svg', // List of images extensions for watching & compression (comma separated)
    baseDir = 'src' // Base directory path without «/» at the end

let paths = {
	styles: {
		src: [
            baseDir + '/' + preprocessor + '/app' + '.' + preprocessor,
            baseDir + '/' + preprocessor + '/vendor' + '.' + preprocessor,
        ],
		dest: baseDir + '/css',
    },
    htmls: {
		src: baseDir,
        dest: baseDir,
    },
    scripts: {
		src: baseDir + '/js/app.js',
        dest: baseDir + '/js',
    },
    libs: {
        src:  [
            'node_modules/inputmask/dist/inputmask.min.js',
            'node_modules/swiper/swiper-bundle.min.js',
            'node_modules/slim-select/dist/slimselect.min.js',
            'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
            'node_modules/simplebar/dist/simplebar.min.js',
        ],
        dest: baseDir + '/js',
    },
	images: {
		src: [ baseDir + '!/img/sprite/**/*', baseDir + '/img/src/*.{jpg,png,svg}' ],
		dest: baseDir + '/img/dist',
    },
    sprites: {
		src: baseDir + '/img/src/sprite/*.svg',
		dest: baseDir + '/img/dist',
    },
    jsOutputName: 'app.min.js',
    libsOutputName: 'vendor.min.js'
}

// LOGIC
const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const version = require('gulp-version-number');
const del = require('del');
const browserSync = require('browser-sync').create();

function browsersync() {
	browserSync.init({
        server: { baseDir: baseDir + '/' },
        browser: "google chrome",
		notify: false
	})
}

const versionConfig = {
    'value': '%MDS%',
    'append': {
        'key': 'v',
        'to': ['css', 'js'],
    },
};

function styles() {
	return src(paths.styles.src)
        .pipe(eval(preprocessor)({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        //.pipe(version(versionConfig))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

//function html() {
//    return src(paths.htmls.src)
//        .pipe(version(versionConfig))
//        .pipe(dest(paths.htmls.dest))
//}

function scripts() {
	return src(paths.scripts.src)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function libs() {
	return src(paths.libs.src)
        .pipe(concat(paths.libsOutputName))
        .pipe(uglify())
        .pipe(dest(paths.libs.dest))
        .pipe(browserSync.stream())
}

function images() {
	return src(paths.images.src)
        .pipe(newer(paths.images.dest))
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
}

function sprites() {
    return src(paths.sprites.src)
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                },
            }
        ))
        .pipe(dest(paths.sprites.dest))
}

function cleaningimages() {
	return del('' + paths.images.dest + '/**/*', { force: true })
}

function startwatch() {
    watch(baseDir  + '/**/*.{' + fileswatch + '}').on('change', browserSync.reload);
	watch(baseDir  + '/**/' + preprocessor + '/**/*', styles);
    watch([baseDir + '/**/*.js', '!' + paths.scripts.dest + '/*.min.js'], scripts);
    watch(baseDir  + '/img/src/**/*.{' + imageswatch + '}', images);
}

exports.cleaningimages = cleaningimages;
exports.sprites = sprites;
exports.images = images;
exports.libs = libs;
exports.scripts = scripts;
//exports.html = html;
exports.styles = styles;
exports.browsersync = browsersync;
exports.default = parallel(styles, libs, scripts, images, sprites, browsersync, startwatch);