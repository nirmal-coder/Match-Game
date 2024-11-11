import './index.css'

const ThumbnailImages = props => {
  const {obj, clickFunction} = props
  const {id, thumbnailUrl} = obj

  const thumbnailClicked = () => {
    clickFunction(id)
  }

  return (
    <li className="list">
      <button type="button" className="btn" id="thumb-img">
        <img src={thumbnailUrl} onClick={thumbnailClicked} alt="thumbnail" />
      </button>
    </li>
  )
}

export default ThumbnailImages
