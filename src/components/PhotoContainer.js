import React from 'react';

import NotFound from './NotFound';

const PhotoContainer = () => {
    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {/* Photos */}
                <NotFound />
            </ul>
        </div>
    );
}

export default PhotoContainer;