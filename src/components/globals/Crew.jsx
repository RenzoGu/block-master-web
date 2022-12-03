import Image from './Image'

export default function Crew({ base_path, credit }) {
	const { profile_path, job, original_name } = {...credit}
	const srcPath = !profile_path ? null : `${base_path}${profile_path}`

	return (
		<div className="cast" title={original_name}>
			<div className="cast-content">
				<Image src={srcPath} name={original_name} className="cast-poster img-fluid" />
				<h6 className="character-name" title={original_name}>{original_name}</h6>
				<p className="character-name" title={job}>{job}</p>
			</div>
		</div>
	)
}