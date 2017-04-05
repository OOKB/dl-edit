import React, { PropTypes } from 'react'
import { map } from 'lodash'
import css from '../style'
import Page from './Page'
import FileSelect from './FileUpload/FileSelectContainer'
import Item from './Item'

const start = 1481955756282
function Image({ dateCreated, name, url }) {
  const created = parseInt((dateCreated - start) / 10000, 10)
  if (!url) return <span>{name}</span>
  return (
    <div className="imageWrapper"><img alt={name} src={url} /><span>{created}</span></div>
  )
}
Image.propTypes = {
  dateCreated: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
}

function ImageUploadPg({ accept, collectionId, handleUpload, images, item }) {
  return (
    <Page>
      <h1 style={css('bb m0 fs2 p1 pl2 pr2')}>Upload an image</h1>
      <div className="imageZone">
        <FileSelect accept={accept} collectionId={collectionId} onSelect={handleUpload} />
        <section style={css('p1 pl2 pr2')}>
          {item && <Item {...item} />}
        </section>
        <section className="imageLibrary flex">
          <h3 style={css('fs1 pl1 pr1 mb1 w100')}>Previously Uploaded</h3>
          {images && map(images, (img, key) => <Image key={key} {...img} />)}
        </section>
      </div>
    </Page>
  )
}
ImageUploadPg.propTypes = {
  accept: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  handleUpload: PropTypes.func.isRequired,
  images: PropTypes.array,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
}
export default ImageUploadPg
