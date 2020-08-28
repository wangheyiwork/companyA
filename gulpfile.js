var { series, src, dest, watch } = require("gulp");

var minifyCss = require("gulp-cssmin");
var minifyHtml = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
// var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var clean = require("gulp-clean");

// function doCss() {
//     return src("./origin/sass/**/*.scss")
//         .pipe(sass())
//         .pipe(autoprefixer())
//         .pipe(minifyCss())
//         .pipe(dest("./publish/css"));
// }

function doCss() {
    return src("./origin/css/**/*.css")
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(dest("./publish/css/"));
}

function doJS() {
    return src("./origin/js/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(dest("./publish/js/"));
}


function doHTML() {
    return src("./origin/html/*.html")
        .pipe(minifyHtml({
            // 是否压缩空白
            "collapseWhitespace": true,
            // 是否压缩style标签及其中的css代码
            "minifyCSS": true,
            // 是否压缩script标签及其中的js代码
            "minifyJS": true,
            // 是否移除没有属性值的HTML标准属性
            "removeEmptyAttributes": true
        }))
        .pipe(dest("./publish/html/"))
}

function doResource() {
    return src("./origin/resource/**/*.*")
        .pipe(dest("./publish/resource/"))
}


function doClean() {
    return src("./publish/", { read: false, allowEmpty: true })
        .pipe(clean())
}

function webServer() {
    // 定位资源 
    return src("./publish")
        .pipe(webserver({
            host: "localhost",
            port: 3002,
            livereload: true,
            open: "./html/index.html",
            // fallback: "./html/index.html",
            proxies: [{
                    source: "/jingdongphp/",
                    target: "http://localhost/jingdongphp/"
                },
                {
                    source: "/data/",
                    target: "http://localhost/data/"
                }

            ]
        }))
}

function refresh() {
    return watch("./origin", series(doClean, [doCss, doHTML, doJS, doResource]))
}

module.exports.webserver = webServer;
module.exports.doResource = doResource;
module.exports.a = series(doClean, [doCss, doHTML, doJS, doResource], webServer);
module.exports.aa = series(webServer, refresh);
module.exports.b = doHTML;