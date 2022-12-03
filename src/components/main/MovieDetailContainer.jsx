import { useState } from 'react'
import CloseButton from '../globals/CloseButton'
import MovieOverScreen from './MovieOverScreen'
import MovieProvider from '../globals/MovieProvider'
import MovieVideo from '../globals/MovieVideo'
import LoaderContainer from '../globals/LoaderContainer'
import MovieCredit from '../globals/MovieCredit'
import MovieSimilar from '../globals/MovieSimilar'
import MovieRecomended from '../globals/MovieRecomended'
import MovieReview from '../globals/MovieReview'

const builder_timer = (Component, timer = 5) => new Promise( resolve => setTimeout(resolve, timer * 1000, Component) )

/*const builder = async (movie, setMovie) => {
	const orderBuild = builder_order(movie, setMovie)
	const groupOrderBuild = orderBuild.map( buildComponent => builder_timer(buildComponent).then( resultComponent => resultComponent ) )
	const groupOrderBuild2 = await recursiveBuilder(orderBuild[0], orderBuild).then(result => result)
	return groupOrderBuild2
	return await orderBuild.map( buildComponent => {
		return builder_timer(buildComponent).then( resultComponent => resultComponent )
	})
}*/

/*const recursiveBuilder = async (currentComponent, allComponents, id = 0, resultedComponents = []) => {
	return await builder_timer(currentComponent, 2).then( resultComponent => {
		resultedComponents.push(resultComponent)
		id++
		if (allComponents?.[id] !== undefined)
			return recursiveBuilder(allComponents[id], allComponents, id, resultedComponents)
		return resultedComponents
	})
}*/

const builder_order = (movie, setMovie) => {
	return [
		<>
			<MovieOverScreen movie={movie} />
		</>,
		<>
			<div className="col">
				<MovieReview movie={movie} setMovie={setMovie} />
			</div>
		</>,
		<>
			<MovieVideo movie={movie} />
		</>,
		<>
			<MovieProvider movie={movie} />
		</>,
		<>
			<div className="col">
				<MovieCredit movie={movie} setMovie={setMovie} />
			</div>
		</>,
		<>
			<div className="col">
				<MovieRecomended movie={movie} setMovie={setMovie} />
			</div>
		</>,
		<>
			<div className="col">
				<MovieSimilar movie={movie} setMovie={setMovie} />
			</div>
		</>
	]
}

export default function MovieDetailContainer({movie, setMovie, target}) {
	const [stateMovieOverScreen, setStateMovieOverScreen] = useState([])
	const [stateMovieReview, setStateMovieReview]         = useState([])
	const [stateMovieVideo, setStateMovieVideo]           = useState([])
	const [stateMovieProvider, setStateMovieProvider]     = useState([])
	const [stateMovieCredit, setStateMovieCredit]         = useState([])
	const [stateMovieSimilar, setStateMovieSimilar]       = useState([])
	const [stateMovieRecomended, setStateMovieRecomended] = useState([])
	const [stateMovie, setStateMovie]                     = useState(movie)
	const setterOrder = [
		setStateMovieOverScreen,
		setStateMovieReview,
		setStateMovieVideo,
		setStateMovieProvider,
		setStateMovieCredit,
		setStateMovieRecomended,
		setStateMovieSimilar,
	]
	const validating = ( stateMovie?.id !== movie?.id && movie !== undefined )
	const overScreenValidating = stateMovieOverScreen.length === 0 || validating
	const reviewValidating     = stateMovieReview.length === 0 || validating
	const videoValidating      = stateMovieVideo.length === 0 || validating
	const providerValidating   = stateMovieProvider.length === 0 || validating
	const creditValidating     = stateMovieCredit.length === 0 || validating
	const similarValidating    = stateMovieSimilar.length === 0 || validating
	const recomendedValidating = stateMovieRecomended.length === 0 || validating
	const orderBuild = builder_order(movie, setMovie)

	if ((stateMovie?.id !== movie?.id && (movie !== undefined || stateMovie === undefined)))
		setStateMovie(movie)

	if (overScreenValidating) {
		if (stateMovieOverScreen.length !== 0)
			setterOrder.map( setter => setter([]))
		builder_timer(orderBuild[0], .5).then( resultComponent => setterOrder[0](resultComponent) )
		.then( _ => {
			builder_timer(orderBuild[1], .1).then( resultComponent => setterOrder[1](resultComponent) )
			.then( _ => {
				builder_timer(orderBuild[2], .1).then( resultComponent => setterOrder[2](resultComponent) )
				.then( _ => {
					builder_timer(orderBuild[3], .1).then( resultComponent => setterOrder[3](resultComponent) )
					.then( _ => {
						builder_timer(orderBuild[4], 1).then( resultComponent => setterOrder[4](resultComponent) )
						.then( _ => {
							builder_timer(orderBuild[5], 1).then( resultComponent => setterOrder[5](resultComponent) )
							.then( _ => {
								builder_timer(orderBuild[6], 1).then( resultComponent => setterOrder[6](resultComponent) )
							})
						})
					})
				})
			})
		})
	}

	return (
		movie === undefined || validating ?
		<LoaderContainer text='Cargando información de la película...' /> :
		<div className="movie-content">
			<CloseButton target={target} />
			{
				overScreenValidating ?
				<LoaderContainer text='Cargando información...' /> :
				stateMovieOverScreen
			}
			<div className="row">
				{
					reviewValidating ?
					<LoaderContainer text='Cargando reseñas...' /> :
					stateMovieReview
				}
			</div>
			<div className="row">
				<div className="col">
				{
					videoValidating ?
					<LoaderContainer text='Cargando vídeos...' /> :
					stateMovieVideo
				}
				</div>
				<div className="col">
				{
					providerValidating ?
					<LoaderContainer text='Cargando servicios de streaming...' /> :
					stateMovieProvider
				}
				</div>
			</div>
			<div className="row">
				{
					creditValidating ?
					<LoaderContainer text='Cargando créditos...' /> :
					stateMovieCredit
				}
			</div>
			<div className="row">
				{
					recomendedValidating ?
					<LoaderContainer text='Cargando películas recomendadas...' /> :
					stateMovieRecomended
				}
			</div>
			<div className="row">
				{
					similarValidating ?
					<LoaderContainer text='Cargando películas similares...' /> :
					stateMovieSimilar
				}
			</div>
		</div>
	)
}