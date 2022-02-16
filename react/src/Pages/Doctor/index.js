import React, { PureComponent } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Style.scss';
import doctorStatsImage from "../../Assets/Images/my_stats_trans.webp";
import doctorDashboardImage from "../../Assets/Images/my_patients_trans.webp";
import { initAPICall } from '../../Providers/ServiceProvider';
import ReCAPTCHA from "react-google-recaptcha";
import { ArrowRight } from 'react-bootstrap-icons';
import images from "../../Assets/Images";

class Doctor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            phoneNumber: '',
            email: '',
            disease: '',
            referDialog: false,
            validated: false,
            errorDialog: false,
            errorMsg: '',
            successDialog: false,
        }
    }
    isCaptchaValidated = false;

    registerUsertype = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { fName, lName, phoneNumber, email } = this.state;

        if (fName.length < 1) {
            this.setState({ errorMsg: { msg: "Please enter your first name", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })

            return
        }
        if ( lName.length < 1) {
            this.setState({ errorMsg: { msg: "Please enter your last name", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return
        }

        if (phoneNumber.length < 10) {
            this.setState({ errorMsg: { msg: "Please enter a valid Phone number", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return
        }

        console.log(this.validateEmail(email) ? "true" : false);
        if (!this.validateEmail(email)) {

            this.setState({ errorMsg: { msg: "Please enter a valid Email Adress", title: 'Error' } }, () => {
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

        this.setState({ validated: true });


        let configObj = {
            method: 'post',
            path: 'unAuthenticatedRoutes/contactUsWebSite',
            params: {
                first_name: fName.trim().toLowerCase(),
                last_name: lName.trim().toLowerCase(),
                phoneNumber: phoneNumber,
                emailID: email,
                message: "WebDoctor",
            }
        }
        initAPICall(configObj).then((response) => {
            if (response.data.error) {
                console.log("eeeeeeeeeeror");
                this.setState({ errorMsg: { msg: response.data.error, title: 'Error' } }, () => {
                    this.setStatesValue('errorDialog', !this.state.errorDialog);
                })
            }
            if (response.data.isSuccessful) {
                console.log("success");
                //Constant.userDetails = response.data.response;
                this.setState({ successDialog: true,errorMsg: { msg: '', title: 'Error' }}
                , () => {
                    this.setStatesValue('errorDialog', !this.state.errorDialog);
                }
                );
                
                setTimeout( () => {
                    this.setState( {successDialog: false})
                  }, 2000);
            }

        }, (error) => {
            console.log("eeeeeeeeeeror2");
            this.setState({ errorMsg: { msg: 'Server is not responding. Please try after some time.', title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
        })
    }


    setStatesValue = (key, Value) => {
        this.setState({ [key]: Value })
    }



    enterEmail = (key, value) => {
        this.setState({ [key]: value });
    }

    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    setDialogVisibility = () => {
        this.setState({ dialogVisibility: !this.state.dialogVisibility })
    }


    render() {
        return (
            <>
            <div className="doctorPage">

                <Row>
                    <Col xs={0} md={1} lg={1} />
                    <Col xs={12} md={10} lg={10} className="heading">
                        Zivov for Doctors
                    </Col>
                    <Col xs={0} md={1} lg={1} />
                </Row>
                <Row style={{ margin: "0px", padding: "0px" }}>
                    <Col md={2} />
                    <Col md={4} className="doctor_stats_image" >
                        <span>
                            <img alt="Mobile" src={doctorStatsImage} width="90%" height="90%"/>
                        </span>
                    </Col>

                    <Col md={5} className="sidetext" >
                        <p style={{ marginBottom: "3vmax" }}>Advanced analytics for better treatment</p>
                        <p style={{ marginBottom: "3vmax" }}>Remote patient monitoring</p>
                        <p style={{ marginBottom: "3vmax" }}>Anytime communication with patients</p>
                        <p style={{ marginBottom: "3vmax" }}>Reach out to more patients through regular webinars</p>
                        <p >Increased revenue</p>
                    </Col>
                    <Col md={1} />
                </Row>

                <Row>
                    <Col md={2} />
                    <Col md={{span:5,order:1}} xs={{span:12,order:2}} className="sidetext" >
                        <p style={{ marginBottom: "3vmax" }}>Patient management system</p>
                        <p style={{ marginBottom: "3vmax" }}>Teleconsultations with your patients</p>
                        <p style={{ marginBottom: "3vmax" }}>Anytime communication with patients</p>
                        <p style={{ marginBottom: "3vmax" }}>Appointment scheduling</p>
                        <p style={{ marginBottom: "3vmax" }}>Complete patient records available 24x7</p>
                        <p>Improved patient outcomes</p>
                    </Col>
                    <Col md={{span:4,order:2}} xs={{span:12,order:1}} style={{display:"inline-block",padding:"auto"}} className="doctor_stats_image" >
                        <div >
                            <img alt="Mobile" src={doctorDashboardImage} width="80%"  height="80%" />
                        </div>
                    </Col>
                    <Col md={1} />
                </Row>
            </div>
            <div classname="bottomBanner" style={{backgroundColor:"#011F40",padding:"10px",overflow:"hidden"}}>
            <Row  id="contactSection">
            <Col md={2} />
            <Col md={4} className="sidetext"  style={{textAlign:"center",justify:"center"}}> 
            <p className="sideheading">Download Zivov App</p>
                      <div align="center" style={{marginTop:"2.5em",alignItems:"center"}}>
                        <a href="https://play.google.com/store/apps/details?id=com.zivovhealth" target="_blank" rel="noopener">
                        <img 
                            src={images.PLAYSTORE}
                            alt="profile pic"
                            width="80%"
                            height="80%"
                             />
                        </a>    
                    </div>
            <p style={{color:"white",marginTop:"20vmin", lineHeight:"2rem",fontSize:"6vmin"}}>Fill in the form to get started with Zivov</p>
            <ArrowRight color="white" />        
            </Col>
            <Col md={1} />
            <Col md={4} className="formCss" >
            <p className="sideheading">Get in touch</p>
                <Form onSubmit={this.registerUsertype} noValidate validated={this.state.validated} style={{color:"white"}} >
                    <Form.Group controlId="formFName">
                        <Form.Label>First Name <span>*</span></Form.Label>
                        <Form.Control maxLength="15" type="text" onChange={(e) => { this.setStatesValue('fName', e.target.value) }} required />
                    </Form.Group>
                    <Form.Group controlId="formLName">
                        <Form.Label>Last Name <span>*</span></Form.Label>
                        <Form.Control maxLength="15" type="text" onChange={(e) => { this.setStatesValue('lName', e.target.value) }} required />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number <span>*</span></Form.Label>
                        <Form.Control maxLength="10" onInput={this.maxLengthCheck} type="number" onChange={(e) => { this.setStatesValue('phoneNumber', e.target.value) }} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email <span>*</span></Form.Label>
                        <Form.Control maxLength="40" onInput={this.maxLengthCheck} type="email" onChange={(e) => { this.setStatesValue('email', e.target.value) }} required />
                    </Form.Group>



                    <ReCAPTCHA
                        sitekey={"6LfHCdYZAAAAAKRzTdA5iNIk05Z-6pK9Y_4pBQIP"}
                        onChange={(val) => {
                            this.isCaptchaValidated = true;
                        }}
                    />
                    <Button variant="secondary" className="submitButton" type="submit">Submit</Button>
                    <p style={{ color: "white" }}>{this.state.errorMsg.msg}</p>
                    {this.state.successDialog && <p style={{color:"white"}}>Thank you for contacting Zivov!<br></br></p>}
                </Form>
                
            </Col>
            <Col md={2} />
        </Row>
        </div>
</>
        )
    }

}

export default withRouter(Doctor);