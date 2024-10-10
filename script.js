//declaramos variables globales vacías para luego acceder a ellas desde la funcion de pintarGraficas
//se puede hacer con for each, llenando las variables dentro de la llave del mismo
//usar depuracion en vez de console.log
let nombres;
let anios;
let nombrePersonaje;
let numeroPeliculas;
async function frescor() {
    let response = await fetch("https://swapi.dev/api/films/");
    let data = await response.json();
    let resultados = data.results;
    nombres = resultados.map(pelicula => pelicula.title);
    let release = resultados.map(pelicula => pelicula.release_date);
    //slice para quedarnos con solo los cuatro caracteres del primer elemento (0) del array de años
    anios = release.map(anio => anio.slice(0, 4));
    //segundo fetch para la segunda gráfica, usamos la misma funcion
    let response2 = await fetch("https://swapi.dev/api/people/");
    let data2 = await response2.json();
    let resultados2 = data2.results;
    nombrePersonaje = resultados2.map(personaje => personaje.name);
    let films = resultados2.map(film => film.films)
    numeroPeliculas = films.map(f => f.length)

}
frescor();
//la funcion incluye al menos un fetch, por lo que se usa await para 
//acceder a los datos, y así acceder a las variables globales, de otra forma las 
//variables globales no se "cargan"
async function pintarGraf() {
    await frescor(); 
    console.log(nombrePersonaje)
    new Chartist.Line('.ct-chart', {
        labels: nombres,
        series: [
            anios
        ]
    }, {
        fullWidth: false,
        chartPadding: {
            top: 30,
            right: 30,
            left: 25
        }
       , axisY: {
        type: Chartist.AutoScaleAxis,
            onlyInteger: true,
            divisor: 1,
            labelInterpolationFnc: function (value, index) {
                return index % 1 === 0 ? value : null;
            }
            
        }
        
    });
    // grafica dos
    new Chartist.Bar('.bar-chart', {
        labels: nombrePersonaje,
        series: [
            numeroPeliculas
        ]
    }, {
    
        stackBars: false,
        axisY: {
            type: Chartist.AutoScaleAxis,
            onlyInteger: true,
            labelInterpolationFnc: function (value, index) {
                return (value);
            }
        }
    }).on('draw', function (data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 30px'
            });
        }
    });
}
pintarGraf();

var options = {
    high: 10,
    low: -10,
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };
  