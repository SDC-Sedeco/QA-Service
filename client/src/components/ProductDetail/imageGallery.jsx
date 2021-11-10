/* eslint-disable indent */
//
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GalleryModal from './galleryModal.jsx';
import withInteractionsApi from '../HOC/withInteractionApi.jsx';
class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      defaultImage: this.props.image,
      defaultClass: 'imgGalleryContainer',
      expanded: false,
    };


  }




  render() {
    // console.log('this.props;', this.props);
    return (
      <React.Fragment>
        {/* <GalleryModal thumbnailClick ={this.props.thumbnailClick} image={this.props.image} selectedPhotos={this.props.selectedPhotos} selectedIndex={this.props.selectedThumbIndex}/> */}
        {/* <div className='icon-buttons-container'> */}
        <button
          onClick={(e) => {
            this.props.sendInteraction('Image Gallery Default View');
            this.props.arrowClick(e);
          }}
          className='icon-buttons-left'
          id='left-arrow'
          aria-label='Move to the previous image'
          style={
            this.props.selectedThumbIndex === 0
              ? { visibility: 'hidden' }
              : { visibility: 'visible' }
          }>
          <FontAwesomeIcon id='left-arrow-icon' icon='arrow-left' />{' '}
        </button>
        <button
          onClick={(e) => {
            this.props.sendInteraction('Image Gallery Default View');
            this.props.arrowClick(e);
          }}
          className='icon-buttons-right'
          id='right-arrow'
          aria-label='Move to the next image'
          style={
            this.props.selectedThumbIndex ===
            this.props.selectedPhotos.length - 1
              ? { visibility: 'hidden' }
              : { visibility: 'visible' }
          }>
          <FontAwesomeIcon id='right-arrow-icon' icon='arrow-right' />
        </button>{' '}
        {/* </div> */}
        <div className={this.state.defaultClass}>
          <img
            onClick={() => {
              this.props.sendInteraction(' Image Gallery Expanded View');
              this.props.displayModal();
            }}
            className={'default-view-image'}
            alt={this.props.defaultStyle}
            src={this.props.image}></img>
        </div>
        <button
          onClick={(e) => {
            this.props.sendInteraction('Image Gallery Default View');
            this.props.arrowClick(e);
          }}
          name='Select the next Image Up'
          id='arrow-up'
          className='chevron-up'
          aria-label='Button up '>
          <FontAwesomeIcon
            id='arrow-up-icon'
            icon='chevron-up'
            name='Select the next Image Up Icon'
          />{' '}
        </button>
        <button
          onClick={(e) => {
            this.props.sendInteraction('Image Gallery Default View');
            this.props.arrowClick(e);
          }}
          name='Select the next Image Down'
          id='arrow-down'
          className='chevron-down'
          aria-label='Button up '>
          <FontAwesomeIcon
            id='arrow-down-icon'
            icon='chevron-down'
            name='Select the next Image Down Icon'
          />
        </button>
        <div className='image-thumbnails'>
          {this.props.selectedPhotos.map((photo, i) => {
            return (
              <img
                onClick={(e) => {
                  this.props.sendInteraction('Image Gallery Default View');
                  this.props.thumbnailClick(e);
                }}
                className='thumbnails'
                style={
                  i === this.props.selectedThumbIndex
                    ? {
                        borderBottom: '4px solid green',
                        backgroundColor: 'white',
                        opacity: '1',
                        boxShadow: '0px 12px 22px 1px #333',
                      }
                    : { borderBottom: 'none' }
                }
                key={i}
                id={i}
                alt={`${this.props.defaultStyle} Style Number ${i + 1}`}
                src={photo.thumbnail_url}></img>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default withInteractionsApi(Tracker, 'Product-detail');
