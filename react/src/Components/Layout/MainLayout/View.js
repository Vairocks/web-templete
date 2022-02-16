
import React, { PureComponent } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import BackGroundVideoComponent from '../../BackGroundVideo';


export class MainLayout extends PureComponent {


    render() {
        const { props } = this;
        return (
            <>

                <Header {...props} />
                {props.isBackgroundVideoRequired &&
                    <BackGroundVideoComponent />
                }
                <props.component   {...props} />
                <Footer />

            </>
        );
    }
};

export default MainLayout;
