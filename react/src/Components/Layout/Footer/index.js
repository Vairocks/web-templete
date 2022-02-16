import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import './Style.scss';
import { withRouter, Link } from 'react-router-dom'

class Footer extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            dialogVisibility: false,
        }
    }


    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    scrollToSection(id) {
        if (window.location.pathname !== '/patient') {
            this.props.history.push({
                pathname: '/patient',
                state: {}
            });
        }
        var elmnt = document.getElementById(id);
        if (elmnt) {
            elmnt.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    setStateMedthod = (key, value) => {
        this.setState({ [key]: value })
    }

    onPressEnter = (e) => {
        if (e.key === 'Enter' && this.validateEmail(this.state.email)) {
            this.sendSubscription();
        }
    }

    sendSubscription = () => {
        if (!this.validateEmail(this.state.email)) {
            this.setStateMedthod('dialogVisibility', !this.state.dialogVisibility);
            return;
        }
    }

    mainTO() {
        window.location.href = "mailto:info@zivov.com";
    }

    setDialogVisibility = () => {
        this.setState({ dialogVisibility: !this.state.dialogVisibility })
    }

    render() {
        return (
            <span className="footerCotnainer">
                <div className="footerContainer">
                <Row>
                    <Col md={4}>
                    <p className="f1">Copyright@2020 Zivov Technologies Pvt. Ltd. All rights reserved.</p>
                </Col>
                <Col md={3}>
                    <Link to="/termscondition"><p className="f2" >Terms and Conditions</p></Link>
                </Col>
                <Col md={2}>
                    <Link to="/privacypolicy"><p className="f2">Privacy Policy</p></Link>
                </Col>
                <Col md={3}><a href="tel:+919711932973"><p className="f2" >Contact@ +91 9711932973</p></a></Col>
                </Row>
                </div>
            </span>
        );
    }
};



export default withRouter(Footer);
