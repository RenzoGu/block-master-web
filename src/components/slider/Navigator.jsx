
export default function Navigator({carouselRef}) {

  return (
    <div id="Navigator" className="slider-watchnow-content row">
      <div className="col-auto">
        <div className="slider-watchnow-content">
          <div className="navigator">
            <button onClick={event => carouselRef.current.slidePrev()}>Anterior</button>
          </div>
        </div>
      </div>
      <div className="col-auto">
        <div className="slider-watchnow-content">
          <div className="navigator">
            <button onClick={event => carouselRef.current.slideNext()}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
}