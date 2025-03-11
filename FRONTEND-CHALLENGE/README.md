# Challenge Frontend: Pokédex


## Objetivo

Crear una aplicación Pokédex utilizando la [PokéAPI](https://pokeapi.co/), implementando un grid de Pokémons con búsqueda y filtrado.

## Archivos proporcionados

- `App.tsx`: Esqueleto básico de la aplicación con estados iniciales
- `PokemonCard.tsx`: Componente reutilizable para mostrar información de un Pokémon
- `types.ts`: Definiciones de tipos básicos para la aplicación
- Archivos CSS con estilos base

## Requisitos (para completar en 1 hora)

### 1. Grid de Pokémon
- Mostrar un grid de tarjetas de Pokémon usando el componente `PokemonCard`
- Cargar la lista de Pokémon desde la API (20 por página)
- Implementar paginación básica (anterior/siguiente) (deseado pero no obligatiorio).

### 2. Gestión de Estado Global
- Implementar gestion del estado global de la aplicación
- Mover la lógica de estados desde App.tsx al contexto

### 3. Búsqueda y Filtrado (opcional)
- Implementar búsqueda por nombre
- Permitir filtrar para mostrar solo los Pokémon favoritos

### 4. Sistema de Favoritos (opcional)
- Implementar la funcionalidad para marcar/desmarcar Pokémon como favoritos
- Mostrar estado de favorito en las tarjetas

## API Endpoints

- Lista de Pokémon: `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
- Detalles de un Pokémon: `https://pokeapi.co/api/v2/pokemon/{id o nombre}`
