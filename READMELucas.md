Buenas! Dejo este readme para explicar cosas que quedaron pendientes que me hubiera gustado hacer.

En App.tsx, me hubiera gustado mostrar un mensaje de error para cuando no se puede obtener la data, además de un loading.
Ese loading lo hubiera implementado con un spinner (o con mas tiempo un skeleton) para que no se quede la pagina en blanco, el estado estaria en un hook personalizado de fetch (<useFetch>). 
También hubiera separado en componentes el list de pokemon (<PokemonList>) y el buscador (<PokemonSearch>) para que no este la logica de busqueda en el componente principal.

En caso que sea más grande el proyecto dividiria las llamadas a las api en servicios (PokemonService, etc) y no hacer fetch de datos adentro de componentes.


Agregué un gitignore para que no subir el node_modules a github, solo con node_modules en este caso pero ahí tambien agregaria el .env, etc.
