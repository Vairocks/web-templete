import React from 'react';
import { withRouter } from 'react-router-dom'
import './Style.scss';
import yoga from '../../Assets/Images/background_yoga.mp4';

const BackGroundVideoComponent = (props) => {
    return (<>
            <div style={{overflow:"hidden"}}>
            <video autoPlay={true} playsInline loop={true} muted={true} className="bgstyle" >
            <source src={yoga} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
            
        </>
    );

}

export default withRouter(BackGroundVideoComponent);