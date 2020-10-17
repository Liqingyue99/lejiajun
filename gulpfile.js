// 1 导入gulp这个第三方模块
const gulp = require('gulp');

// 2-1 导入gulp-cssmin这个第三方模块
const cssmin = require('gulp-cssmin');

// 2-2 导入gulp-autoprefixer这个第三方模块
const autoprefixer = require('gulp-autoprefixer');

// 6-1 导入gulp-htmlmin这个第三方模块
const htmlmin = require('gulp-htmlmin');

// 7-1 导入del这个第三方模块
const del = require('del')

// 2-3 书写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./lejiajun/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

// 3-1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./lejiajun/images/**')
    .pipe(gulp.dest('./dist/images'))
}

// 5-1 书写一个移动lib文件夹的方法
const libHandler = ()=>{
    return gulp.src('./lejiajun/lib/*.js')
    .pipe(gulp.dest('./dist/lib'))
}

// 6-2 书写一个压缩html文件的方法
const htmlHandler = ()=>{
    return gulp.src('./lejiajun/pages/*.html')
    // 压缩html需要配置压缩的参数
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest('./dist/pages'))
}

// 7-2 书写一个任务,自动删除dist目录
const delHandler = ()=>{
    // 这个函数的目的就是为了删除dist目录使用的
    return del(['./dist'])
}

// 8 书写一个自动监控文件的任务
// 监控src下面的所有文件,只要一修改,就执行响应的任务
// 比如src下面的css文件夹,只要里面的文件一修改,我就执行一下cssHanlder这个任务
const watchHanlder = ()=>{
    // 监控src下面的css文件夹下的所以css文件,只要里面的文件一修改,我就执行一下cssHanlder这个任务
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/lib/*.js',libHandler)
    gulp.watch('./src/pages/*.html',htmlHandler)
}

// 导出一个默认任务
// 当我将来执行默认任务default的时候,就会自动帮我删除dist目录,同时压缩css,js,html,同时移动images和lib文件夹
// 小细节:当你在命令行执行gulp default的时候,可以不写default
// 你在命令行执行gulp这个指令,就是在执行gulp default
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        imgHandler,
        libHandler,
        htmlHandler
    ),
    watchHanlder    
)
