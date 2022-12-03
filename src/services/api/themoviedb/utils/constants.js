const API_KEY = '57960594fac8909060f0c44b1e7767ac'

const defaultParams = {
	refresh_date: {
		short: 1, // Tiempo de días
		long: 7, // Tiempo de días
	},
	basePath: 'https://api.themoviedb.org',
	version: '3',
	most_valueted_score: 7,
	less_valueted_score: 6.9,
}

const configurationMethods = {
	getConfiguration: 'getConfiguration',
	getCountries: 'getCountries',
	getJobs: 'getJobs',
	getLanguages: 'getLanguages',
}
const discoverMethods = {
	getMovie: 'getMovie',
	getTv: 'getTv',
}
const genresMethods = {
	getMovieList: 'getMovieList',
	getTvList: 'getTvList',
}
const moviesMethods = {
	getMovie: 'getMovie',
	getAlternativeTitles: 'getAlternativeTitles',
	getCredits: 'getCredits',
	getPopular: 'getPopular',
	getReviews: 'getReviews',
	getRecomendations: 'getRecomendations',
	getSimilarMovies: 'getSimilarMovies',
	getTopRated: 'getTopRated',
	getUpcoming: 'getUpcoming',
	getVideos: 'getVideos',
	getWatchProviders: 'getWatchProviders',
}
const searchMethods = {
	getMovies: 'getMovies',
	getCompanies: 'getCompanies',
	getPeople: 'getPeople',
}

const fullPath = `${defaultParams.basePath}/${defaultParams.version}`

const apiFilterTitle = {
	discover: {
		[discoverMethods.getMovie]: 'Todas las películas'
	},
	movies: {
		[moviesMethods.getMovie]: 'Película encontrada'
	},
	search: {
		[searchMethods.getMovies]: 'Resultado de búsqueda'
	}
}
const departments = {
	Acting: 'Actuación',
	Actors: 'Actores',
	Art: 'Arte',
	Camera: 'Cámara',
	"Costume & Make-Up": 'Vestuario y Maquillaje',
	Crew: 'Personal',
	Directing: 'Dirección',
	Editing: 'Edición',
	Lighting: 'Iluminación',
	Production: 'Producción',
	Sound: 'Sonido',
	"Visual Effects": 'Efectos Visuales',
	Writing: 'Escritura',
}

export {
	API_KEY,
	defaultParams,
	departments,
	fullPath,
	apiFilterTitle,
	configurationMethods,
	discoverMethods,
	genresMethods,
	moviesMethods,
	searchMethods,
}