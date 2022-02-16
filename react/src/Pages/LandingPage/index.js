import React, { PureComponent } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Style.scss';
import { initAPICall } from '../../Providers/ServiceProvider';
import ReCAPTCHA from "react-google-recaptcha";
import images from "../../Assets/Images";
import * as Icon from 'react-bootstrap-icons';
import ZivovLogo from '../../Assets/Images/zivov_logo_blue_big.png';
import { EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons';

const inclusionsArray = [
    { img: images.TWO, title: "Your doctors active involvement" },
    { img: images.THREE, title: "Nutrition" },
    { img: images.FOUR, title: "Fitness" },
    { img: images.FIVE, title: "Lab Testing" },
    { img: images.SIX, title: "Live Sessions" },
    { img: images.SEVEN, title: "CBT" },
    { img: images.EIGHT, title: "Medical Device" },
];

const colorArray = ["#EFFFFF", "#feedff", "#EEFFEE", "#fff6d0", "#FFFFEF", "#f1d2ff", "#ebf2f6"];

class LandingPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            phoneNumber: '',
            email: '',
            validated: false,
            errorDialog: false,
            errorMsg: '',
            successDialog: false,
            readMore: [false, false, false, false],
            change: 0,
        }
    }
    isCaptchaValidated = false;

    registerUsertype = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { fName, lName, phoneNumber, email } = this.state;

        if (fName.length < 1) {
            console.log("1");
            this.setState({ errorMsg: { msg: "Please enter your first name", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })

            return
        }
        if (lName.length < 1) {
            console.log("2");
            this.setState({ errorMsg: { msg: "Please enter your last name", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return
        }

        if (phoneNumber.length < 10) {
            console.log("3");
            this.setState({ errorMsg: { msg: "Please enter a valid Phone number", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })
            return
        }

        if (!this.validateEmail(email)) {
            console.log("4");
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
                message: "webUser",
            }
        }
        initAPICall(configObj).then((response) => {
            if (response.data.error) {
                this.setState({ errorMsg: { msg: response.data.error, title: 'Error' } }, () => {
                    this.setStatesValue('errorDialog', !this.state.errorDialog);
                })
            }
            if (response.data.isSuccessful) {
                this.setState({ successDialog: true, errorMsg: { msg: '', title: 'Error' } }
                    , () => { this.setStatesValue('errorDialog', !this.state.errorDialog); }
                );

                setTimeout(() => {
                    this.setState({ successDialog: false })
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


    raise = (e, unit) => {
        e.target.style.transform = `translate(0px,${unit}px)`;
        e.target.style.transition = "0.3s";
    }

    getFunctioalityIcons = (logo, logoText) => {
        return (
            <div className="goalLogoCol"
                onMouseOver={(e) => { this.raise(e, -5) }}
                onMouseLeave={(e) => { this.raise(e, 5) }} >
                <img
                    alt={logoText}
                    src={logo}
                    height="75vmin"
                    width="75vmin"
                    className="goalLogoImage"
                />
                <p className="functionalityContainerText">{logoText}</p>
            </div>
        );
    }

    renderNotes = (noteVal, isReadMore) => {
        let newNotes = noteVal;
        if (!isReadMore) {
            newNotes = newNotes.substring(0, 150);
            newNotes = newNotes + '...';
        }
        return newNotes
    }

    userFeedBack = (image, name, weight_details, medicine_details, note, index) => {
        let { readMore } = this.state;
        return (
            <Col xs={12} lg={4} xl={4} sm={4} md={4} className="feedBackContainer" key={index}>
                {this.profilePicDisplay(image)}
                <p className="feedbackNameText" ><i>{name}</i></p>
                <p className="feedbackOtherText"> {weight_details}</p>
                <p className="feedbackOtherText"> {medicine_details}</p>
                <p className="feedbackOtherDetailText">
                    {this.renderNotes(note, this.state.readMore[index])}
                </p>
                <p className="readMoreText">
                    <a onClick={() => {
                        readMore.splice(index, 1, !readMore[index]);
                        this.setState({ readMore: readMore, change: this.state.change - 1 })
                    }}>{!this.state.readMore[index] ? "Read More..." : "Read Less"}</a>
                </p>
            </Col>


        );
    }

    profilePicDisplay = (loc) => {
        return (<>

            <div className="profilePicOuterCircle">
                <div className="profilePicInnerCircle" >
                    <img
                        src={loc}
                        alt="profile pic"
                        width="100%"
                        height="100%" />
                </div>
            </div>

        </>
        );
    }

    render() {
        return (
            <>
                <Container className="masterContainer">
                    <div className="landingPage">
                        <img src={ZivovLogo}
                            alt="Zivov"
                            className="zivovLogo"
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <Row>
                        <Col md={{ span: 6, order: 2 }} className="contactFormContainer" >
                            <div className="formCss" >
                                <p className="sideheading">BOOK AN APPOINTMENT</p>
                                <p className="subheading">We'll get in touch with you soon</p>
                                <Form onSubmit={this.registerUsertype} noValidate validated={this.state.validated} className='smallText' >
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
                                    <div className="center">
                                        <ReCAPTCHA
                                            sitekey={process.env.REACT_APP_CAPTCHA}
                                            onChange={(val) => {
                                                this.isCaptchaValidated = true;
                                            }}
                                        />
                                        <Button  type="submit" className="submitButtonForm">Submit</Button><br /><br /><br />
                                        <p className="whiteText">{this.state.errorMsg.msg}</p>
                                        {this.state.successDialog && <p className="whiteText">Thank you for contacting Zivov!<br></br></p>}

                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col md={{ span: 6, order: 1 }} className="leftInfoSection" >
                            <p className="topMainHeading">
                                India’s most comprehensive AI-based
                                preventive &amp; chronic care platform
                            </p>
                            <div className="buttonContainer">
                                <a href={process.env.REACT_APP_PLAYSTORE} target="_blank" rel="noopener" className="playStore">
                                    <img
                                        src={images.PLAYSTORE}
                                        alt="profile pic"
                                        className="imagePic"
                                    />
                                </a>
                                <Button className="blueButton" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/planCategory', state: {}
                                    });
                                }}>View Plans</Button>
                            </div>
                        </Col>
                    </Row>
                    <div className="sectionCommon addmargintop">
                        <p className="sectionHeader">About Us</p>
                        <Row>
                            <Col xs={12} lg={6} xl={6} sm={6}>
                                <div className="videoContainer" >
                                    <video loop={true} muted={true} className="videoTag" onClick={() => { this.refs.vidRef.pause(); this.setState({ isPlaying: false }); }} ref="vidRef">
                                        <source className="videocomp" src={images.ZIVOV_INTRO_VIDEO} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {!this.state.isPlaying &&
                                        <div className="overlayText">
                                            <Icon.PlayBtnFill
                                                onClick={() => {
                                                    this.refs.vidRef.play();
                                                    this.setState({ isPlaying: true });
                                                }}
                                                color="#EF426F" size="40"
                                                style={{ backgroundColor: "transparent" }} />
                                        </div>}
                                </div>
                            </Col>
                            <Col xs={12} lg={6} xl={6} sm={6}>
                                <p className="videoText">
                                    Zivov is a digital health program that uses the combination of behavioral science and unmatched personalized care to help improve habits and empower you to live a healthy, disease-free life.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Container>
                <div className="healthGoals">
                    <p className="topHeadingFunctionalities"> One platform, Multiple conditions</p>
                    <p className="subHeadingFunctionalities"> Fighting chronic illness alone is tough.</p>
                    <p className="sub1HeadingFunctionalities">That's why Zivov works with your doctor along with our team of multidisciplinary experts for you to stay healthier</p>
                    <Row >
                        <Col xs={0} md={12} >
                            <Row className="goalLogoContainer">
                                {this.getFunctioalityIcons(images.DIABETES, "Diabetes")}
                                {this.getFunctioalityIcons(images.BP, "High Blood Pressure")}
                                {this.getFunctioalityIcons(images.KIDNEY, "Chronic Kidney Disease")}
                            </Row>
                            <Row className="goalLogoContainer">
                                {this.getFunctioalityIcons(images.PRE_DIABETES, "Pre-Diabetes")}
                                {this.getFunctioalityIcons(images.CONDITION, "Prevention")}
                                {this.getFunctioalityIcons(images.PREVENTION, "Weight Management")}
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Container className="masterContainer">
                    <div className="sectionCommon addmargintop">
                        <p className="sectionHeader">Inclusions</p>
                        <div className="inclusionContainer">
                            {inclusionsArray.map((item, indx) =>
                                <div className="includebox" style={{ backgroundColor: colorArray[indx] }}>
                                    <div className="inclusionSubContainer">
                                        <img
                                            src={item.img}
                                            className="inclusionImage"
                                            alt="Image NA"
                                            width="100%"
                                            height="100%"
                                            />
                                        <p className="inclusionTitle">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>)}
                        </div>
                    </div>


                    <div className="sectionCommon">
                        <p className="sectionHeader">Transformation</p>
                        <Row>
                            <Col>
                                <img src={images.RESULTS} alt="results" className="resultImage" />
                            </Col>
                        </Row>
                    </div>
                    <div className="sectionCommon">
                        <p className="sectionHeader"> Kind words by Zivovians</p>
                        <Row>
                            {(this.state.readMore[0] || true) && this.userFeedBack(images.PROFILE1, "Mrs. Premlata", "Weight drop - 7 kgs", "BP Medicine reduction - 75%", "My health and energy levels are much better after joining Zivov program. My bp medicine has reduced from 5 mg twice a day to just 2.5 mg once a day..The app helps me to track the bp and see my bp trends. My nutritionist Mrs. Usha has been of great help in gradually moving me to the new diet regime and keeps me motivated to follow it. I have also started going for regular walks and started with yoga and other simple exercises.I get my diet plan and daily exercise challenges in the app itself. It's very easy to follow a healthy lifestyle now", 0)}
                            {(this.state.readMore[1] || true) && this.userFeedBack(images.PROFILE2, "Mr. Kapoor", "Weight drop - 5 kgs", "HbA1c drop - 1.4", "Dont have words to thank Zivov team. I was diagnosed with prediabetes in my regular annual checkup and it raised an alarm as my grandmother had diabetes too. My friend mentioned about Zivov trials and I gave it a try. Cant believe how methodically they approach the problem and after counselling session I could understand my lifestyle issues. They not only adviced, they helped me achieve my targets. I would get constant support from the entire team and nudges too when i went off-track with my diet. Todai can say i am prediabetes free and relieved that i had a narrow escape from diabetes. I happily recommend Zivov for their prediabetes program.", 1)}
                            {(this.state.readMore[2] || true) && this.userFeedBack(images.PROFILE3, "Mr. Raj Kumar", "Weight drop - 9.5 kgs", "HbA1c drop - 1.7", "Thanks to Zivov I have reversed my diabetes in just 3 months. They haven't put me on any extreme diets. They educated me about what I should eat and the right time to eat.  Through the food tracking in the application, I can check carbohydrates percentage after every meal and stay on track with my diet. They have also introduced me to bodyweight exercises and home workouts which have helped me immensely in controlling my blood sugar. Thumbs up to the Zivov diabetes program.", 2)}
                        </Row>
                    </div>
                    <div className="footerContainer">
                        <div className="footerSection">
                            <a href="tel:+919711932973">
                                <TelephoneFill color="#101F40" size="25" className="footerIcon" />
                                91+ 9711932973</a>
                        </div>
                        <div className="footerSection">
                            <a href="mailto:contact@zivov.com">
                                <EnvelopeFill color="#101F40" size="25" className="footerIcon" />
                                contact@zivov.com</a>
                        </div>
                    </div>
                </Container>
            </>
        )
    }

}

export default withRouter(LandingPage);