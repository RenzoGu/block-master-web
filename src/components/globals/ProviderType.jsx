
export default function ProviderType ({provider, title, config_images}) {
	return (
    <div className="col mb-1">
      <h5 className="m-0 mb-1">{title}</h5>
      <div className="row">
      {
        provider.data.map((provider_data, index) => {
          const logo_path = `${config_images.secure_base_url}${config_images.poster_sizes[2]}${provider_data.logo_path}`
          return <ProviderTypeImage key={index} src={logo_path} title={provider_data.provider_name} />
        })
      }
      </div>
    </div>
	)
}

const ProviderTypeImage = ({src, title}) => {
  return (
    <div className="col-auto text-center">
      <img
      src={src}
      alt={title}
      title={title}
      className="img-fluid provider-img" />
    </div>
  )
}