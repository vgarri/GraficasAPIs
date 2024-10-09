// Practicaremos cómo crear gráficas con las librerías vistas en clase

// Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
// En el eje X el nombre de la película
// En el eje Y año de publicación
// API ENDPOINT --> https://swapi.dev/api/films/
// Pediremos los personajes de Star Wars y pintaremos una gráfica de barras en la que podamos ver
// En el eje X el nombre del personaje
// En el eje Y el número de películas en las que ha participado.
// API ENDPOINT --> https://swapi.dev/api/people/
// Para pintar todo esto usaremos Chartist Link a la docu: Chartist
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
    anios = release.map(anio => anio.slice(0,4));
    //segundo fetch para la segunda gráfica
    let response2 = await fetch("https://swapi.dev/api/people/");
    let data2 = await response2.json();
    let resultados2 = data2.results;
    nombrePersonaje = resultados2.map(personaje => personaje.name);
    let films = resultados2.map(film => film.films)
    numeroPeliculas = films.map(f => f.length)

}
frescor();

async function pintarGraf(){
    await frescor();
    console.log(nombrePersonaje)
    new Chartist.Line('.ct-chart', {
        labels: nombres,
        series: [
          anios
        ]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 40
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
          labelInterpolationFnc: function(value) {
            return (value);
          }
        }
      }).on('draw', function(data) {
        if(data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 30px'
          });
        }
      });
}
pintarGraf();