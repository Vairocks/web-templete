import React, { PureComponent } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import './Style.scss';
import { CheckCircle } from 'react-bootstrap-icons';
import { withRouter } from 'react-router-dom';
import Constant from '../../Providers/ConstantProvider';
import { initAPICall } from '../../Providers/ServiceProvider';
import ReCAPTCHA from "react-google-recaptcha";

class ReferPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            link: '',
            name: '',
            phoneNumber: '',
            disease: '',
            speciality: '',
            referDialog: false,
            validated: false,
            errorDialog: false,
            errorMsg: '',
            successDialog: false
        }

        if (!this.props.location.state || !this.props.location.state.userType) {
            this.props.history.push({
                pathname: '/patient',
            });
        }
    }

    isCaptchaValidated = false;

    componentDidMount() { }

    setStatesValue = (key, Value) => {
        this.setState({ [key]: Value })
    }

    displayReferDialog(val) {
        this.setState({ referDialog: val });
    }

    registerUsertype = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { name, phoneNumber, disease, speciality } = this.state;
        this.setState({ validated: true });

        if (phoneNumber.length < 10) {
            this.setState({ errorMsg: { msg: "Please enter a valid Phone number", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return
        }


        if (!this.isCaptchaValidated) {
            this.setState({ errorMsg: { msg: "Please validate captcha", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return
        }



        let configObj = {
            method: 'post',
            path: 'unAuthenticatedRoutes/registerWebsiteUser',
            params: {
                name: name,
                phoneNumber: phoneNumber.toLowerCase(),
                disease: disease,
                speciality: speciality,
                emailID: this.props.location.state.emailID.toLowerCase(),
                userType: this.props.location.state.userType,
                invitationCode: Constant.invitationCode
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
                this.setState({ successDialog: true })
            }

        }, (error) => {
            this.setState({ errorMsg: { msg: 'Server is not responding. Please try after some time.', title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
        })
    }


    redirectToDetailPage = () => {
        this.setState({ successDialog: false }, () => {
            this.props.history.push({
                pathname: '/referdetail',
            });
        })
    }

    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    render() {
        let userType = null, emailID = null;
        if (this.props.location.state) {
            if (this.props.location.state.userType) {
                userType = this.props.location.state.userType;
            }

            if (this.props.location.state.emailID) {
                emailID = this.props.location.state.emailID;
            }
        }
        return (
            <>
                <div className="referContainerReferPage">
                    {userType === 'patient' && (
                        <>
                            <p className="enrollMessageTitle">For Patients</p>
                            <p className="enrollMessage">No need to enroll in multiple programs to manage your illness.</p>
                            <p className="enrollMessage1">We work with your doctors to provide a complete care program built just for you</p>
                        </>
                    )}
                    {userType === 'doctor' && (
                        <>
                            <p className="enrollMessageTitle">For Doctors</p>
                            <p className="enrollMessage">Give your patients the best possible and cost-effective care.</p>
                            <p className="enrollMessage1">We will help you boost your practice with out-of-the-box chronic care solution.</p>
                        </>
                    )}
                    <Row className="">
                        <Col className="colForm">
                            <div className="formInnerContainer">
                                <Form onSubmit={this.registerUsertype} noValidate validated={this.state.validated}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Name <span>*</span></Form.Label>
                                        <Form.Control maxLength="15" onChange={(e) => { this.setStatesValue('name', e.target.value) }} required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Phone Number <span>*</span></Form.Label>
                                        <Form.Control maxLength="10" onInput={this.maxLengthCheck} type="number" onChange={(e) => { this.setStatesValue('phoneNumber', e.target.value) }} required />
                                    </Form.Group>
                                    {userType === 'patient' && (
                                        <>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Diseases <span>*</span></Form.Label>
                                                <Form.Control as="select" value={this.state.disease} onChange={(e) => { this.setStatesValue('disease', e.target.value) }} required>
                                                    <option value=""></option>
                                                    <option value="Diabetes">Diabetes</option>
                                                    <option value="Hypertension">Hypertension</option>
                                                    <option value="Cholesterol">High Cholesterol</option>
                                                    <option value="Heart">Heart(CVD)</option>
                                                    <option value="Kidney">Kidney(CKD)</option>
                                                    <option value="PCOS">PCOS</option>
                                                    <option value="Prediabetes">Prediabetes</option>
                                                    <option value="Obesity">Obesity</option>
                                                    <option value="Cancer">Cancer</option>
                                                    <option value="COPD">COPD</option>
                                                    <option value="Prevention">Prevention</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </>
                                    )}
                                    {userType === 'doctor' && (
                                        <>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Speciality <span>*</span></Form.Label>
                                                <Form.Control as="select" required onChange={(e) => { this.setStatesValue('speciality', e.target.value) }}>
                                                    <option value=""></option>
                                                    <option value="Endocrinologist">Endocrinologist</option>
                                                    <option value="Nephrologist">Nephrologist</option>
                                                    <option value="Internal_Medicine">Internal Medicine</option>
                                                    <option value="Cardiologist">Cardiologist</option>
                                                    <option value="General_Practitioner">General Practitioner</option>
                                                    <option value="Gynecologist">Gynecologist</option>
                                                    <option value="Urologist">Urologist</option>
                                                    <option value="Oncologist">Oncologist</option>
                                                    <option value="Bariatric_Physician">Bariatric Physician</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </>
                                    )}
                                    <ReCAPTCHA
                                        sitekey={process.env.REACT_APP_CAPTCHA}
                                        onChange={(val) => {
                                            this.isCaptchaValidated = true;
                                        }}
                                    />
                                    <Button variant="primary" className="submitButton" type="submit">Submit</Button>
                                </Form>
                            </div>
                        </Col>
                        {userType === 'patient' && (
                            <>
                                <Col xs lg="4" className="sodeRegistrationInfo">
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Become healthier</p>
                                            <p className="listInfo">Holistic care to reduce or eliminate the need for medication. </p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={23} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Dedicated health team</p>
                                            <p className="listInfo">Dedicated health team for diet, fitness and wellness</p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={23} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Online like-minded community</p>
                                            <p className="listInfo"> Gain the support of peers with similar challenges and interests.</p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={23} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Health records &amp; insights</p>
                                            <p className="listInfo">Digitize your records at one place and get actionable insights</p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={23} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Personalized daily health goals</p>
                                            <p className="listInfo"> Reach your health goals for a healthier you</p>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        )}

                        {userType === 'doctor' && (
                            <>
                                <Col xs lg="4" className="sodeRegistrationInfo">
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Complete EMR</p>
                                            <p className="listInfo">Single holistic and longitudinal health records of your patients</p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Remote patient monitoring</p>
                                            <p className="listInfo">Real-time view of patient's health powered by AI </p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Increased revenue</p>
                                            <p className="listInfo">Boost your revenue with new patients &amp; chronic care.</p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Happier patients</p>
                                            <p className="listInfo">Increased patient satisfaction and loyalty</p>
                                        </div>
                                    </div>
                                    <div className="listContainer">
                                        <div className="iconContainer">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div className="infoContainer">
                                            <p className="listTitle">Expanded reach</p>
                                            <p className="listInfo"> Get access to more and more patients-anytime, anywhere.</p>
                                        </div>
                                    </div>
                                </Col>
                            </>
                        )}
                    </Row>
                </div>
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
                <Modal show={this.state.successDialog} onHide={this.redirectToDetailPage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Successful Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You are registered successfully.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="submitButton_model" onClick={this.redirectToDetailPage}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
};

export default withRouter(ReferPage);