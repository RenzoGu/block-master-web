
export default function SliderInfo({event, items}) {
  return (
    <div className="slider-actions-title-container">
      <div className="content">
        <h3 id="movieTitle">{items[event.item-1].props.name}</h3>
      </div>
    </div>
  )
}