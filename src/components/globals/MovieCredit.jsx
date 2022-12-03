import { useMovieCredit } from '../../hooks/index'
import { departments } from '../../services/api/themoviedb/utils/constants'
import Cast from './Cast'
import Crew from './Crew'
import LoaderContainer from './LoaderContainer'

const builder = ({type = 'cast', title = 'Reparto', base_path, credits, Component}) => {

	const __departments = {}
	const __people = {}
	// eslint-disable-next-line array-callback-return
	credits[type].map( credit => {
		__departments[credit.known_for_department] = departments?.[credit.known_for_department]
		__people[credit.known_for_department] = __people?.[credit.known_for_department] === undefined ? [] : [...__people[credit.known_for_department]]
		__people[credit.known_for_department].push(credit)
	})

	return (
		<>
			<h4 className="my-1">{title}</h4>
			<div className="movie-credit-content">
			{
				Object.keys(__departments).map( (department, key) => {
					return (
						<div key={key}>
						<h5 className="mb-0 mt-1">{__departments[department]}</h5>
						<div className="credit-row pb-1">
							{
								__people[department].map( (credit, key) => {
									return (
										<div key={key} className="col-auto">
											<Component
												base_path={base_path}
												credit={credit} />
										</div>
									)
								})
							}
						</div>
						</div>
					)
				})
			}
			</div>
		</>
	)

}

export default function MovieCredit({movie, setMovie}) {
  const hookMovieCredit = useMovieCredit(movie?.id)
  if (!hookMovieCredit?.valid) return <LoaderContainer text='Cargando créditos...' />
 
	if (hookMovieCredit.movie?.cast?.length === 0 || hookMovieCredit.movie?.cast === undefined)  return <h4 className="my-1">No hay información de reparto</h4>
	if (hookMovieCredit.movie?.crew?.length === 0 || hookMovieCredit.movie?.crew === undefined)  return <h4 className="my-1">No hay información del personal</h4>

	const config_image = hookMovieCredit.config.config.images
	const base_path    = `${config_image.secure_base_url}${config_image.poster_sizes[2]}`

	return (
		<div className="movie-credit-container">
			<div className="row">
				<div className="col col-md-6 movie-credit-col">
					{builder({base_path, credits:hookMovieCredit.movie, Component:Cast})}
				</div>
				<div className="col col-md-6 movie-credit-col">
					{builder({type:'crew',title:'Equipo',base_path, credits:hookMovieCredit.movie, Component:Crew})}
				</div>
			</div>
		</div>
	)
}