# vitta

Demo [click to access the project](https://nuxt-products-rouge.vercel.app/).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Environment variables

```sh
Create .env file in the root of the project with the variables below

VITE_BASE_URL_TMDB = https://api.themoviedb.org/3


VITE_TOKEN_TMDB = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGQ2MzExOGUxYmIyMWNhZGExMWY2OWRiODdjODFkMyIsInN1YiI6IjY1OWUwOTU1MWQzNTYzMDE0OGFiYzEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mrw2hfiwQFfNnRMmJdDL4A3Wo0sd1C6UVoZRvXO920M


VITE_URL_IMAGE_TMDB = https://www.themoviedb.org/t/p/w220_and_h330_face
```

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev  -  http://localhost:5173/
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run unit
```

![Tested component](public/comp.png)
![Test result](public/test.png)

