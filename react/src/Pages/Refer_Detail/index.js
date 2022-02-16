import React, { PureComponent } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Style.scss';
import { PersonPlusFill, HandThumbsUp, ArrowUpCircleFill } from 'react-bootstrap-icons';
import { withRouter } from 'react-router-dom'
import Constant from '../../Providers/ConstantProvider';
import { initAPICall } from '../../Providers/ServiceProvider';

class ReferDetailPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            link: process.env.REACT_APP_INVITE + Constant.userDetails.invitationCodeRefer,
            referDialog: false,
            emailAddress: '',
            errorDialog: false,
            errorMsg: '',
            reload: '',
            isCheckFromThisPage:false
        }
    }

    componentDidMount() {}

    displayReferDialog = () => {

        let referLinkInputField = document.getElementById("referTextInputFieldDetaild");
        referLinkInputField.select();
        referLinkInputField.setSelectionRange(0, 99999); /*For mobile devices*/ 
        document.execCommand("copy"); 
        this.setState({ referDialog: !this.state.referDialog })
    }

    setStatesValue = (key, value) => {
        this.setState({ [key]: value });
    }
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    getUserData = () => {
        if (!this.validateEmail(this.state.emailAddress)) {
            this.setState({ errorMsg: { msg: 'Please Enter Valid email address', title: 'Invalid Email Address' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return;
        }
        let configObj = {
            method: 'post',
            path: 'unAuthenticatedRoutes/getRegistrationDetails',
            params: {
                "emailID": this.state.emailAddress.toLowerCase()
            }
        }
        initAPICall(configObj).then((response) => {
            if (response.data.error) {
                this.setState({ errorMsg: { msg: response.data.error, title: 'Error' } }, () => {
                    this.setStatesValue('errorDialog', !this.state.errorDialog);
                })
            }
            if (response.data.isSuccessful) {
                Constant.userDetails = response.data.response;
                this.setState({isCheckFromThisPage:true, link: 'http://zivov.com/?invite_code=' + Constant.userDetails.invitationCodeRefer })
            }

        }, (error) => {
            this.setState({ errorMsg: { msg: 'Server is not responding. Please try after some time.', title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
        })

    }

    render() {
        return (
            <span className="referDetailPage">
                {
                    Constant.userDetails && (
                        <>
                            <div className="referContainerDetail">
                                {Constant.userDetails.userType === 'patient' ? (
                                    <>
                                        <p className="enrollMessageTitle">You're #{
                                           parseInt(Constant.userDetails.waitlistNumber) +400
                                        } on the Waitlist</p>
                                        <p className="enrollMessage">Zivov is invite-only. You've invited "{Constant.userDetails.totalReferenceCount}" people</p>
                                        <p className="enrollMessage1">Invite others to get access sooner.</p>
                                    </>
                                ) :
                                    <>
                                        <p className="enrollMessageTitle">Thank you for joining Zivov family.</p>
                                        {!this.state.isCheckFromThisPage && (
                                        <p className="enrollMessage">We'll call you in next 24 hours to have a short discussion on our partnership details.</p> 
                                        )}
                                    </>
                                }
                                <div className="stepsContainer">
                                    <div className="connectingLine"></div>
                                    <div className="circle circle1">
                                        <div className="circle_medium">
                                            <PersonPlusFill size={50} />
                                        </div>
                                        <div className="numberCircle circle1_small">
                                            <span className="textNumber">1</span>
                                        </div>
                                    </div>
                                    <div className="circle circle2">
                                        <div className="circle_medium">
                                            <HandThumbsUp size={50} />
                                        </div>
                                        <div className="numberCircle circle2_small">
                                            <span className="textNumber">2</span>
                                        </div>
                                    </div>
                                    <div className="circle circle3">
                                        <div className="circle_medium">
                                            <ArrowUpCircleFill size={50} />
                                        </div>
                                        <div className="numberCircle circle3_small">
                                            <span className="textNumber">3</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="stepsContainer_title">
                                    <div className="circle_title">
                                        <p>Invite others</p>
                                    </div>
                                    <div className="circle_title">
                                        <p>They Join</p>
                                    </div>
                                    <div className="circle_title">
                                        <p> {Constant.userDetails.userType === 'patient' ? "You Move Up" : "Earn Zivov Points"}</p>
                                    </div>
                                </div>
                                <p className="enrollMessage inviteText">Invite other patients/doctors  with the link below.</p>
                                <p className="enrollMessage inviteText1">Click on the copy link and paste it on WhatsApp/Message to send the link.</p>
                                <div className="referInputContainer">
                                    <input id ="referTextInputFieldDetaild"type="text" readonly="readonly" className="referinputfield" value={this.state.link} />
                                    <Button className="referButton" onClick={this.displayReferDialog}>Copy Link</Button>
                                </div>
                            </div>
                        </>
                    )}
                { !Constant.userDetails && (
                    <>
                        <div className="referContainerDetail referDetailnoData">
                            <p className="enrollMessage inviteText">Enter your email address to check your status and refer.</p>
                            <div className="referInputContainer">
                                <input type="text" className="referinputfield" value={this.state.emailAddress} onChange={(e) => { this.setStatesValue('emailAddress', e.target.value) }} />
                                <Button className="referButton" onClick={this.getUserData}>Submit</Button>
                            </div>
                        </div>
                    </>
                )}
                <Modal show={this.state.referDialog} onHide={this.displayReferDialog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invite Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><p>{this.state.link}</p></Modal.Body>
                    <Modal.Footer>
                        <Button className="submitButton_model" onClick={this.displayReferDialog}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.errorDialog} onHide={() => {
                    this.setStatesValue('errorDialog', !this.state.errorDialog)
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.errorMsg.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>  {this.state.errorMsg.msg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" className="submitButton_model" onClick={() => {
                            this.setStatesValue('errorDialog', !this.state.errorDialog)
                        }}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    }
};


export default withRouter(ReferDetailPage);
