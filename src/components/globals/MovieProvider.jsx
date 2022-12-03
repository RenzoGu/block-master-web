import { useMovieProvider } from '../../hooks/index'
import LoaderContainer from './LoaderContainer'
import ProviderType from './ProviderType'

export default function MovieProvider ({movie}) {
  const hookMovie = useMovieProvider(movie?.id)

  if (!hookMovie.valid) return <LoaderContainer text='Cargando servicios de streaming...' />

  const config_data_type = {
    link: 'Mas Información',
    rent: 'Alquiler',
    buy: 'Compra',
    flatrate: 'Stream',
  }
  const config_images = hookMovie.config.config.images
  //const lenguage  = hookMovie.lenguage
  const location  = hookMovie.location
  const countries = hookMovie.config.countries
  //const lenguages = hookMovie.config.lenguages
  const providers = []
  let country, link
  for (let prop in hookMovie.movie.results) {
    country = countries.find( country => country.iso_3166_1 === prop && location.country === prop)
    if (country !== undefined) {
      const provider = {
        country: prop,
        data: []
      }
      for (let prop2 in hookMovie.movie.results[prop]) {
        provider.data.push({
          type: prop2,
          data: hookMovie.movie.results[prop][prop2]
        })
      }
      providers.push(provider)
      break
    }
  }

  if ( providers.length === 0) return <h4 className="my-1">{`No se encontraron servicios de streaming para ${location.city} (${location.country})`}</h4>

  return (
    <div className="movieInfo-content row provider-list-container">
      <div className="col p-0">
        <h4 className="my-1">¿Dónde encontrar esta película?</h4>
        <div className="row">
        {
          // eslint-disable-next-line array-callback-return
          providers[0].data.map((provider, index) => {
            if (provider.type !== 'link')
              return (
                <ProviderType
                  key={index}
                  provider={provider}
                  title={config_data_type[provider.type]}
                  config_images={config_images}
                />
              )
            // eslint-disable-next-line no-lone-blocks
            {link = {...provider}}
          })
        }
          <div className="col-12 mb-1">
            <h5 className="m-0 mb-1">
              <a className="more-info" target="_blank" href={link.data} rel="noreferrer">{config_data_type[link.type]}</a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}