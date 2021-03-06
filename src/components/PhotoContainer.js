import React from 'react';
import { useParams } from 'react-router-dom';

import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = ({ results, title }) => {

    const { query } = useParams();
    let photos;

    if (results.length > 0) {
        photos = results.map( photo => <Photo key={photo.id} url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} /> );
        // https://live.staticflickr.com/${photo.server}/{photo.id}_${photo.secret}_c.jpg full url template
    } else {
        photos = <NotFound />
    }

    return (
        <div className="photo-container">
            <h2>
                Results for: { title ? title : query }
            </h2>
            <ul>
                {photos}
            </ul>
        </div>
    );
}

export default PhotoContainer;