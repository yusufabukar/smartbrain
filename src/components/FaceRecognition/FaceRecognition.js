import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
    return (
        <div className='centre ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageURL} alt='' width='500px' height='auto' />
                {boxes.map(box => {
                    return <div key={box.rightColumn} className='bounding-box' style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}>
                            </div>
                })
                }
            </div>
        </div>
    );
};

export default FaceRecognition;