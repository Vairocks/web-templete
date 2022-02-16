import React, { PureComponent } from 'react';
import { Row, Col, Button, Form,Spinner } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import './Style.scss';
import ReCAPTCHA from "react-google-recaptcha";
import { initAPICall } from '../../Providers/ServiceProvider';
import { Linkedin, Facebook, Instagram, EnvelopeFill, } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
import { validatePhoneNumber } from '../../Providers/UtilsProvider';
import ProgressiveImage from 'react-progressive-graceful-image';
import images from '../../Assets/Images';
import blood_glucose from '../../Assets/Images/blood_glucose.mp4';
import blood_pressure from "../../Assets/Images/blood_pressure.mp4";
import structured_diet from "../../Assets/Images/check3.MOV";
import yoga from "../../Assets/Images/yoga.mp4";
import personalization from "../../Assets/Images/personalization_white.mp4";
import transformations from "../../Assets/Images/transformations_blue_2.mp4"; 
import zivov_main from "../../Assets/Images/zivov_overall_website.mp4";
// function scrollToSection(id) {
//     var elmnt = document.getElementById(id);
//     if (elmnt) {
//         elmnt.scrollIntoView({
//             behavior: "smooth"
//         });
//     }
// }

class DashboadPage extends PureComponent {

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
            cardHover: false,
            readMore: [false, false, false],
            change: 1,
            domCreated:false,
        }
    }

    componentDidMount = () => {
        setTimeout(()=> this.setState({domCreated:true}),5000);
    }

    
    formClear = () => {
        this.setState({
            fName: '',
            lName: '',
            phoneNumber: '',
            email: '',
            disease: '',
            referDialog: false,
            validated: false,
            errorDialog: false,
            errorMsg: '',
        });
    }

    isCaptchaValidated = false;


    enterPhoneNumber = (phNumberEntered) => {
        let newNumber = validatePhoneNumber(phNumberEntered);
        this.setStatesValue('phoneNumber', newNumber);
    }

    profilePicDisplay = (loc) => {
        return (<>

            <div className="profilePicOuterCircle">
                <div className="profilePicInnerCircle" >
                <ProgressiveImage src={loc} >
                    {(src)=><img
                        src={loc}
                        alt="profile pic"
                        width="100%"
                        height="100%" />}
                </ProgressiveImage>
                </div>
            </div>

        </>
        );
    }

    softVideoPlayer = (url, custom_width = "100%") => {
        if(this.state.domCreated){
        return (
            <video autoPlay={true} playsInline loop={true} muted={true} style={{ width: custom_width }} >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );}else{
            return(
            <div style={{color:"white", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner animation="border" variant="primary" style={{ fontSize: '1.8rem' }} />
        </div>);
        }
    }

    raise = (e, unit) => {
        e.target.style.transform = `translate(0px,${unit}px)`;
        e.target.style.transition = "0.3s";
    }

    goalLogo = (logo, logoText) => {
        
        return (

            <Col xs={1} className="goalLogoCol"
                onMouseOver={(e) => { this.raise(e, -5) }}
                onMouseLeave={(e) => { this.raise(e, 5) }}
            >
                <ProgressiveImage src={logo} >
                    
                {(src) => <img
                    alt={logoText}
                    src={src}
                    height="75vmin"
                    width="75vmin"
                    className="goalLogoImage"
                />}
                </ProgressiveImage>
                <br />
                <span className="texts">{logoText}</span>
            </Col>

        );
    }

    userFeedBack = (image, name, weight_details, medicine_details, note, index) => {
        let { readMore } = this.state;
        return (

            <Col lg={4} className="feedBackTile">
                <Row>
                    <Col xs={4} />
                    <Col xs={4} style={{ textAlign: "center" }}>
                        <div >
                            {this.profilePicDisplay(image)}
                        </div>
                    </Col>
                    <Col xs={4} />
                </Row>
                <Row className="headline1Container">
                    <Col>
                        <p className="headline1Style" ><i>{name}</i></p>
                    </Col>
                </Row>
                <Row className="headline2Container" >
                    <Col>
                        <p className="headline2Style">
                            {weight_details}
                            <br />
                            {medicine_details}
                        </p>
                    </Col>
                </Row>
                <Row className="noteText" style={!this.state.readMore[index] ? { height: "100px" } : {}}>
                    <Col>
                        <p>
                            {note}
                        </p>

                    </Col>
                </Row>
                <p className="readMoreText">
                    <a onClick={() => {
                        readMore.splice(index, 1, !readMore[index]);
                        this.setState({ readMore: readMore, change: this.state.change - 1 })
                    }}>{!this.state.readMore[index] ? "Read More..." : "Read Less"}</a>
                </p>
            </Col>


        );
    }

    registerUsertype = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { fName, lName, phoneNumber, email, disease, } = this.state;
        const form = event.currentTarget;

        if (fName.length < 1) {
            this.setState({ errorMsg: { msg: "Please enter your first name", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            })

            return;
        }
        if (lName.length < 1) {
            this.setState({ errorMsg: { msg: "Please enter your last name", title: 'Error' } }, () => {
                this.setStatesValue('errorDialog', !this.state.errorDialog);
            });
            return;
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
                disease: disease,
                emailID: email,
                message: "webUser",
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
                this.setState({ successDialog: true, errorMsg: { msg: '', title: 'Error' } }
                    , () => {
                        this.setStatesValue('errorDialog', !this.state.errorDialog);
                    }
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

    mainTO() {
        window.location.href = "mailto:contact@zivov.com";
    }

    setDialogVisibility = () => {
        this.setState({ dialogVisibility: !this.state.dialogVisibility })
    }



    render() {
        const {domCreated} = this.state;
        return (

            <div className="parentPage">
                <div id="homeSection" className="homeText">
                    <Row>

                        <Col xs={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }} className="textSection" >
                            <p className="upperTextFont" >Personalized<br /> digital care<br /> made<br /> human{"      "}
                            </p>

                            <p className="lowerText">India’s most comprehensive AI-based<br /> preventive & chronic care platform</p>
                        </Col>
                        <Col xs={{ span: 12, order: 1 }} lg={{ span: 5, order: 3 }} style={{ padding: 0 }}>
                        <ProgressiveImage src={images.BANNER_IMG} delay={4000}>
                            {(src) => <img
                                src={src}
                                
                                width="100%"
                                height="100%"
                                style={{ padding: "0px", margin: "0" }}
                            />}
                        </ProgressiveImage>
                        </Col>
                    </Row>
                </div>


                <div id="aboutSection" className="bannerContainer">
                    <Row>
                        <Col xs={0} lg={1} xl={2} />
                        <Col lg={10} xl={8} className="bannerHeading">
                            Zivov is a digital health program that uses the combination of  behaviour science and unmatched personalized care to help improve habits and empower you to live a healthy, disease free life.
                        </Col>
                        <Col xs={0} lg={1} xl={2} />
                    </Row>


                    <Row>
                        <div style={{ position: "relative", width: "100%" }}>
                          {domCreated &&  <video loop={true} muted={true} style={{ width: "100%" }} onClick={() => { this.refs.vidRef.pause(); this.setState({ isPlaying: false }); }} ref="vidRef">
                                <source className="videocomp" src={zivov_main} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>}
                            {!domCreated &&
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                                <Spinner animation="border" variant="primary" style={{ fontSize: '1.8rem' }} />
                            </div>
                            }
                            {!this.state.isPlaying && domCreated &&
                                <div className="overlayText" style={{ position: "absolute", top: "47%", left: "47%", color: "#F24F1F" }}>
                                    <Icon.PlayBtnFill onClick={() => { this.refs.vidRef.play(); this.setState({ isPlaying: true }); }} color="#EF426F" size="40" style={{ backgroundColor: "transparent" }} />
                                </div>}
                        </div>

                    </Row>
                </div>


                <Row>
                    <Col xs={12}>
                        <p className="strangeText">Take the first step for your better health</p>
                    </Col>
                </Row>


                <div className="healthGoals" id="heatlthGoalsSection">
                    <Row>
                        <Col xs={0} md={0} lg={0} />
                        <Col xs={12} md={12} lg={12} className="heading">
                            One platform, Multiple conditions
                        </Col>
                        <Col xs={12} md={12} lg={12} className="text1">
                            Fighting chronic illness alone is tough.
                        </Col>
                        <Col xs={12} md={12} lg={12} className="text2">
                            That's why Zivov works with your doctor along with our team of multidisciplinary experts for you to stay healthier
                        </Col>
                        <Col xs={0} md={1} lg={2} />
                    </Row>

                    <Row >
                        <Col xs={0} md={12} >
                            <Row className="goalLogoContainer">
                                {this.goalLogo(images.DIABETES, "Diabetes")}
                                {this.goalLogo(images.BP, "High Blood Pressure")}
                                {this.goalLogo(images.KIDNEY, "Chronic Kidney Disease")}
                            </Row>
                            <Row className="goalLogoContainer">
                                {this.goalLogo(images.PRE_DIABETES, "Pre-Diabetes")}
                                {this.goalLogo(images.CONDITION, "Prevention")}
                                {this.goalLogo(images.PREVENTION, "Weight Management")}
                            </Row>
                            <Row className="goalLogoContainer">

                            </Row>
                        </Col>
                        <Col md={0} />
                    </Row>
                </div>

                <div style={{ height: "400px" }}></div>





                <div id="TheAppSection" className="theAppSection_blue_bk">
                    <Row>
                        <Col md={1}></Col>
                        <Col md={10} >

                            <Row>
                                <p className="heading">Track your vitals and get actionable insights</p>
                            </Row>

                            <Row style={{ marginBottom: "20vh" }}>
                                <Col md={1}></Col>
                                <Col md={5}>
                                    <p className="SubHeading">Blood Pressure</p><br />
                                    {domCreated && this.softVideoPlayer(blood_pressure)}
                                </Col>

                                <Col md={5}>
                                    <Col md={1}></Col>
                                    <p className="SubHeading">Blood Glucose</p><br />
                                    {domCreated &&this.softVideoPlayer(blood_glucose)}
                                </Col>
                            </Row>

                            <Row className="sideTextRow">
                                <Col md={1} />
                                <Col md={5} className="sidetext">Improve your health through structured diet program with food analysis.
                                </Col>

                                <Col md={5} style={{ display: "flex", alignItems: "center" }} >
                                    <div>
                                        {domCreated &&this.softVideoPlayer(structured_diet)}
                                    </div>
                                </Col>
                                <hr />
                            </Row>

                            <Row className="sideTextRow">
                                <Col xs={0} md={{ span: 1, order: 1 }} />
                                <Col xs={{ span: 12, order: 2 }} md={{ span: 5, order: 2 }} style={{ display: "inline-block", textAlign: "center" }} >
                                    <div>
                                        <div>
                                            <ProgressiveImage src={images.ADHERENCE}>
                                                {(src)=><img src={src} width="60%" height="80%" alt="adherence Image" />}
                                            </ProgressiveImage>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{ span: 12, order: 1 }} md={{ span: 5, order: 4 }} className="sidetext">Make daily progess by enhancing your adherence</Col>

                            </Row>
                            <Row className="sideTextRow">
                                <Col md={1} />
                                <Col md={5} className="sidetext">Get health insights and nudges to motivate you to meet your health goals</Col>
                                <Col md={5} style={{ display: "inline-block", textAlign: "center" }} >
                                    <div>
                                        <div>
                                            <ProgressiveImage src={images.INSIGHTS}>
                                            {src=><img src={src} width="60%" height="60%" alt="Insights"/>}</ProgressiveImage>
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                            <Row className="sideTextRow">
                                <Col xs={0} md={{ span: 1, order: 1 }} />
                                <Col xs={{ span: 12, order: 2 }} md={{ span: 5, order: 2 }} style={{ display: "flex", alignItems: "center" }} >
                                    <div>
                                        <ProgressiveImage src={images.GOALS}>
                                        {(src)=><img src={src} width="100%" height="100%" alt="Goals"/>}
                                        </ProgressiveImage>
                                    </div>
                                </Col>
                                <Col xs={{ span: 12, order: 1 }} md={{ span: 5, order: 4 }} className="sidetext">Accomplish  daily Fitness & lifestyle modification challenges</Col>

                            </Row>

                            <Row className="sideTextRow" >
                                <Col md={1} />
                                <Col md={5} className="sidetext">Improve your fitness through yoga & structured exercise programs</Col>

                                <Col md={5} style={{ display: "flex", alignItems: "center" }} >
                                    <div>
                                        {domCreated &&this.softVideoPlayer(yoga)}
                                    </div>
                                </Col>

                            </Row>

                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </div>



                <div style={{ height: "400px" }}></div>

                <div id="personalisationSection" className="personalizations">
                    <Row>
                        <Col xs={0} md={2} lg={3} />
                        <Col xs={12} md={8} lg={6} className="heading3" >

                            Unmatched Personalization
                            <div style={{ marginTop: "4vh", position: "relative" }}>
                                <video autoPlay={true} playsInline loop={true} muted={true} style={{ width: "100%" }} >
                                    <source src={personalization} />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="overlayText" style={{ position: "absolute", top: "10%", right: "20%", color: "#F24F1F" }}>
                                    Health<br />
                                    Coaches
                                </div>
                                <div className="overlayText" style={{ position: "absolute", bottom: "20%", right: "20%", color: "#FFB800" }}>
                                    Fitness<br />
                                    Experts
                                </div>
                                <div className="overlayText" style={{ position: "absolute", bottom: "20%", left: "20%", color: "#80B900" }}>
                                    Nutritionist<br />
                                    Educator
                                </div>
                            </div>
                        </Col>
                        <Col xs={0} md={2} lg={3} />
                    </Row>
                </div>


                <div style={{ height: "400px" }}></div>

                <div id="TransformationsSection_blue_bk" className="healthGoals_blue_bk">
                    <Row>
                        <Col xs={0} md={1} lg={1} />
                        <Col xs={12} md={11} lg={10} >
                            <Row className="heading2" style={{}} >
                                <Col xs={12}>
                                    Transformation

                                </Col>
                                <Col xs={12}>
                                    <div style={{ marginTop: "2vh" }}>
                                        {domCreated &&this.softVideoPlayer(transformations)}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={0} md={1} lg={1} />
                    </Row>
                </div>
                <div className="bannerContainer2">
                    <Row>
                        <Col xs={12} >
                            <p className="feedbackHeading2" >
                                Kind words by Zivovians</p>
                            <div className="users" style={{ backgroundColor: "white" }}>
                                <Row>
                                    {(this.state.readMore[0] || true) && this.userFeedBack(images.PROFILE1, "Mrs. Premlata", "Weight drop - 7 kgs", "BP Medicine reduction - 75%", "My health and energy levels are much better after joining Zivov program. My bp medicine has reduced from 5 mg twice a day to just 2.5 mg once a day..The app helps me to track the bp and see my bp trends. My nutritionist Mrs. Usha has been of great help in gradually moving me to the new diet regime and keeps me motivated to follow it. I have also started going for regular walks and started with yoga and other simple exercises.I get my diet plan and daily exercise challenges in the app itself. It's very easy to follow a healthy lifestyle now", 0)}
                                    {(this.state.readMore[1] || true) && this.userFeedBack(images.PROFILE2, "Mr. Kapoor", "Weight drop - 5 kgs", "HbA1c drop - 1.4", "Dont have words to thank Zivov team. I was diagnosed with prediabetes in my regular annual checkup and it raised an alarm as my grandmother had diabetes too. My friend mentioned about Zivov trials and I gave it a try. Cant believe how methodically they approach the problem and after counselling session I could understand my lifestyle issues. They not only adviced, they helped me achieve my targets. I would get constant support from the entire team and nudges too when i went off-track with my diet. Todai can say i am prediabetes free and relieved that i had a narrow escape from diabetes. I happily recommend Zivov for their prediabetes program.", 1)}
                                    {(this.state.readMore[2] || true) && this.userFeedBack(images.PROFILE3, "Mr. Raj Kumar", "Weight drop - 9.5 kgs", "HbA1c drop - 1.7", "Thanks to Zivov I have reversed my diabetes in just 3 months. They haven't put me on any extreme diets. They educated me about what I should eat and the right time to eat.  Through the food tracking in the application, I can check carbohydrates percentage after every meal and stay on track with my diet. They have also introduced me to bodyweight exercises and home workouts which have helped me immensely in controlling my blood sugar. Thumbs up to the Zivov diabetes program.", 2)}
                                </Row>

                            </div>
                        </Col>
                    </Row>

                    <br style={{ backgroundColor: "black" }} />

                </div>


                <div id="contactSection" className="bannerContainer" style={{ backgroundColor: "#011F40", padding: "2rem" }}>
                    <Row >
                        <Col xs={12} md={3} >
                            <p className="sideheading">Download Zivov App</p>
                            <div style={{ marginTop: "2.5em" }}>
                                <a href={process.env.REACT_APP_PLAYSTORE} target="_blank" rel="noopener">
                                    <ProgressiveImage src={images.PLAYSTORE}>
                                    {(src)=><img
                                        src={src}
                                        alt="profile pic"
                                        width="80%"
                                        height="80%"
                                    />}</ProgressiveImage>
                                </a>
                            </div>
                        </Col>

                        <Col xs={12} md={3}>
                            <p className="sideheading">
                                Quick Links
                            </p>
                            <Col md={12}>
                                <ul>
                                    <li> <Link to="/doctorPage" className="quickLink">For Doctors</Link></li>
                                    <li> <Link to="/blog" className="quickLink">Blogs</Link></li>
                                    <li> <Link to="/home" className="quickLink" onClick={() => { this.mainTO() }}>Support</Link></li>
                                    <li><Link to="/home" className="quickLink">Press</Link></li>
                                </ul>
                            </Col>
                            <Col md={12} />

                            <div style={{ margin: "2rem" }}>

                                <a href="https://www.linkedin.com/company/zivov" target="_blank" rel="noopener"><Linkedin color="white" size="30" style={{ backgroundColor: "#101F40", borderRadius: "10%", marginRight: "1rem" }} /></a>
                                <a href="https://www.instagram.com/zivovhealth/" target="_blank" rel="noopener"><Instagram color="#101F40" size="30" style={{ backgroundColor: "white", marginRight: "1rem", borderRadius: "25%", border: "1px block white" }} /></a>
                                <a href="https://www.facebook.com/zivovhealth" target="_blank" rel="noopener"><Facebook color="white" size="30" style={{ backgroundColor: "#101F40", borderRadius: "15%", marginRight: "1rem" }} /></a>
                                <EnvelopeFill color="white" size="30" style={{ backgroundColor: "#101F40", borderRadius: "15%", marginRight: "1rem" }} onClick={() => { this.mainTO() }} />
                            </div>
                        </Col>

                        {<Col xs={0} md={2} />}

                        <Col xs={12} md={3} >
                            <div className="sideheading" >Get In Touch</div>
                            <div className="form" style={{ color: "white", overflow: "hidden" }}>
                                <Form onSubmit={this.registerUsertype} noValidate validated={this.state.validated}>
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
                                        <Form.Control value={this.state.phoneNumber} maxLength="10" onInput={this.maxLengthCheck} type="text" onChange={(e) => { this.enterPhoneNumber(e.target.value) }} required />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email <span>*</span></Form.Label>
                                        <Form.Control maxLength="40" onInput={this.maxLengthCheck} type="email" onChange={(e) => { this.setStatesValue('email', e.target.value) }} required />
                                    </Form.Group>
                                    <>
                                        <Form.Group controlId="formDisease">
                                            <Form.Label>Select Condition <span>*</span></Form.Label>
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


                                    <ReCAPTCHA
                                        sitekey={"6LfHCdYZAAAAAKRzTdA5iNIk05Z-6pK9Y_4pBQIP"}
                                        onChange={(val) => {
                                            this.isCaptchaValidated = true;
                                        }}
                                    />
                                    <Button variant="secondary" className="submitButton" type="submit">Submit</Button>
                                    <p style={{ color: "white" }}>{this.state.errorMsg.msg}</p>
                                    {this.state.successDialog && <p style={{ color: "white" }}>Thank you for contacting Zivov!<br>
                                    </br>
                                        We'll contact you soon.
                                    </p>}
                                </Form>
                            </div>

                        </Col>
                    </Row>
                </div>

            </div >
        );
    }
};


export default withRouter(DashboadPage);