
// Así integramos las dependencias.
// a la hora de importarlas son funciones y se lees puede pasar ciertos valores
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// gulp en la ver. 4, require que cada una de las tareas tenga una función asociada a ella.
// gulp funciona con tareas y cada tarea es una función que tiene lo que se conoce como un "pipe"
// es como una instrucción que se ejecuta despues de otra.

function css(){
    return gulp
        .src('scss/app.scss') // Aquí colocaremos la ruta donde trabajaremos con scss o sass.
        .pipe(autoprefixer({// Aquí podemos empezar a agregar nuestros "pipes"
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sass({ // Estás opciones son para cuando el codigo salga ya preprocesado.
            outputStyle: 'expanded', // expanded, nested, compact, compressed
        }))
        .pipe(gulp.dest('css')) // Aquí colocamos la carpeta donde se guardarán los archivos preprocesados.
}


function watchFiles(){
    // Aquí le pasaremos que archivos son los que queremos que está función este revisando cuando cambien
    // para volverlos a ejecutar. También con que función se van a ejecutar.
    // Con * le indicamos que cualquier archivo que este dentro de la carpeta "scss" con la extensión ".scss"
    // Y cuando esos archivos cambien que ejecuten la función de css
    gulp.watch('scss/*.scss', css);
    // También podemos escuchar los cambios que se hagan por el index.html
    gulp.watch('index.html'); // Este es un ejemplo en caso de que querramos observar más archivos.
}

// Registrar funciones como tareas (para correr las funciones)
// La tarea se llamará 'css' y la función se llama "css"
gulp.task('css',css)

// Podemos crear diferentes tareas y agregar diferentes funciones con diferentes nombres.
// gulp.parallel() Sirve para correr funciones de forma asincrona (a la vez).
gulp.task('watch', gulp.parallel(watchFiles));

