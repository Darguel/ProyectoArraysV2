
// POKEMONS

let dades;
let Pokemons = []
let Municipis = []
let Meteorits = []
let Movies = []
let fila = new Object();
let sortOrder = 'asc'; 

//a

document.addEventListener("DOMContentLoaded", function(){
	mostrarTodo();
})
document.addEventListener("DOMContentLoaded", function(){
	printTable();
})



// POKEMONS

function mostrarTodo(){
	fetch("js/data/pokemon.json")
	.then((response) => response.json())
	.then((data) => {
	Pokemons = data.pokemon;		
	
	// MUNICIPIS
	fetch("js/data/municipis.json")
	.then((response) => response.json())
	.then((data) => {
		Municipis = data.elements;	

		// METEORITS
			fetch("js/data/earthMeteorites.json")
			.then((response) => response.json())
			.then((data) => {
				Meteorits = data;
				
				// MOVIES
				fetch("js/data/movies.json")
				.then((response) => response.json())
				.then((data) => {
				Movies = data.movies;		
				
				let todo = [];
				for (let x=0; x <1000; x++){
					let poke = (x < Pokemons.length ? Pokemons[x].name : "-");
					let muni = (x < Municipis.length ? Municipis[x].municipi_nom : "-");
					let movi = (x < Movies.length ? Movies[x].title : "-");
					let mete = (x < Meteorits.length ? Meteorits[x].name : "-");

					fila = { 'Pokemon' : poke, 'Municipis' : muni, 'Pelicula' : movi, 'Earth' : mete }
					todo.push(fila)
				}
				console.table(todo)
				});

			});
	 	});
	});
}


function reload(){
  	location.reload();
}

function printTable(){
	fetch("js/data/pokemon.json")
	.then((response) => response.json())
	.then((data) => {
		// Pokemons = data.pokemon;
	

	let tablapokemon = document.getElementById("tableContainer");
		tablapokemon.innerHTML = '';

	let tabla = document.createElement("table");
	tabla.setAttribute("border", "1");
	let tbody = document.createElement("tbody");

	let cabezera=document.createElement("tr");

	let idcabezera=document.createElement("th");
	idcabezera.textContent="id";
    idcabezera.setAttribute("id", "idHeader");
    idcabezera.addEventListener("click", function () {
        ordenaLlistaColumna('id');
    });

	let imgcabezera=document.createElement("th");
	imgcabezera.textContent="Imatge";

	let nomcabezera=document.createElement("th");
	nomcabezera.textContent="Nom";
    nomcabezera.setAttribute("Nom", "NomHeader");
    nomcabezera.addEventListener("click", function () {
        ordenaLlistaColumna('nom');
    });


	let pescabezera=document.createElement("th");
	pescabezera.textContent="Pes";
    pescabezera.setAttribute("pes", "pesHeader");
    pescabezera.addEventListener("click", function () {
        ordenaLlistaColumna('pes');
    });

	cabezera.appendChild(idcabezera);
	cabezera.appendChild(imgcabezera);
	cabezera.appendChild(nomcabezera);
	cabezera.appendChild(pescabezera);

	tbody.appendChild(cabezera);

	Pokemons.forEach(pokemon => {
		
		let fila = document.createElement("tr");
		let id = document.createElement("td");
		id.textContent = pokemon.id;

		let imagen = document.createElement("td");
		imagen.innerHTML = "<img src=" + pokemon.img + ">";

		let nombre = document.createElement("td");
		nombre.textContent = pokemon.name;

		let peso = document.createElement("td");
		peso.textContent = pokemon.weight;

		fila.appendChild(id);
		fila.appendChild(imagen);
		fila.appendChild(nombre);
		fila.appendChild(peso);
		
		tbody.appendChild(fila);
	})

	tabla.appendChild(tbody);
	tablapokemon.appendChild(tabla);
})
}


function ordenaLlista(ordre) {
    sortOrder = ordre;
    Pokemons.sort((a, b) => (sortOrder === 'asc') ? a.id - b.id : b.id - a.id);
    
    printTable();
}

function ordenaLlistaColumna (columna){
    sortOrder = (sortOrder === 'asc') ? 'desc' : 'asc';

    switch (columna) {
        case 'id':
            Pokemons.sort((a, b) => (sortOrder === 'asc') ? a.id - b.id : b.id - a.id);
            break;
        case 'nom':
            Pokemons.sort((a, b) => (sortOrder === 'asc') ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
            break;
        case 'pes':
            Pokemons.sort((a, b) => {
                const weightA = parseFloat(a.weight.replace(' kg', ''));
                const weightB = parseFloat(b.weight.replace(' kg', ''));
                return (sortOrder === 'asc') ? weightA - weightB : weightB - weightA;
            });
            break;
        }

    printTable();
}


function buscarPorNombre() {
    const nombreABuscar = document.getElementById("nombrePokemon").value.toLowerCase();
    const pokemonsFiltrados = Pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(nombreABuscar));
    mostrarResultadoEnHTML(pokemonsFiltrados);
}

function mostrarResultadoEnHTML(resultados) {
    const resultadoDiv = document.getElementById("resultat");
    resultadoDiv.innerHTML = '';

    if (resultados.length == 0) {
        resultadoDiv.textContent = "No se encontraron Pokémon con ese nombre";
    } 
	else 
	{
        const nuevaTabla = document.createElement("table");
        nuevaTabla.setAttribute("border", "1");
        const tbody = document.createElement("tbody");

        
        const cabezera = document.createElement("tr");
        const idCabezera = document.createElement("th");
        idCabezera.textContent = "id";
        const nombreCabezera = document.createElement("th");
        nombreCabezera.textContent = "Imatge";
        const imagenCabezera = document.createElement("th");
        imagenCabezera.textContent = "Nom";
        const pesoCabezera = document.createElement("th");
        pesoCabezera.textContent = "Pes";

        cabezera.appendChild(idCabezera);
        cabezera.appendChild(nombreCabezera);
        cabezera.appendChild(imagenCabezera);
        cabezera.appendChild(pesoCabezera);
        tbody.appendChild(cabezera);

        
        resultados.forEach(pokemon => {
            const fila = document.createElement("tr");
            const id = document.createElement("td");
            id.textContent = pokemon.id;
            const nombre = document.createElement("td");
            nombre.textContent = pokemon.name;

            
            const imagen = document.createElement("td");
            imagen.innerHTML = `<img src="${pokemon.img}">`;

            const peso = document.createElement("td");
            peso.textContent = pokemon.weight;

            fila.appendChild(id);
			fila.appendChild(imagen);
            fila.appendChild(nombre);
            fila.appendChild(peso);
            
            tbody.appendChild(fila);
        });

        nuevaTabla.appendChild(tbody);

        
        const tablaContainer = document.getElementById("tableContainer");
        tablaContainer.innerHTML = '';
        tablaContainer.appendChild(nuevaTabla);
    }
}

function calcMitjana() {
    const tabla = document.querySelector("table");

    if (tabla) {
        const filas = tabla.getElementsByTagName("tr");

        const pesos = [];

        for (let i = 1; i < filas.length; i++) {
            const peso = parseFloat(filas[i].getElementsByTagName("td")[3].textContent);
            pesos.push(peso);
        }
			// console.log(pesos)

        if (pesos.length > 0) {
            const sumaPesos = pesos.reduce((total, peso) => total + peso, 0);
            const mediaPeso = sumaPesos / pesos.length;

            const mediaPesoConDosDecimales = mediaPeso.toFixed(2);

            alert(`La media del peso de los Pokémon en la tabla actual es: ${mediaPesoConDosDecimales}`);
        } else {
            alert("No hay Pokémon en la tabla actual.");
        }
    } else {
        alert("No hay tabla disponible.");
    }
}

function contarPokemonsPorTipo() {
    const tiposContados = {};

    Pokemons.forEach(pokemon => {
        const tipo = pokemon.type;
        if (tiposContados[tipo]) {
            tiposContados[tipo]++;
        } else {
            tiposContados[tipo] = 1;
        }
    });

    return tiposContados;
}

function crearGrafico() {
    const tiposContados = contarPokemonsPorTipo();

    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");

    const tipos = Object.keys(tiposContados);
    const cantidades = Object.values(tiposContados);

    const myChart = new Chart(ctx, {
        type: "polarArea",
        data: {
            labels: tipos,
            datasets: [{
                label: "Cantidad de Pokémon por Tipo",
                data: cantidades,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(201, 203, 207)',
                    'rgb(54, 162, 235)'
                ],
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
