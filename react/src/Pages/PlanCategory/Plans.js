import React, { useEffect, useState, memo } from 'react';
import { Row, Col, Card, Modal, Button, Form, Table } from 'react-bootstrap';
import { initAPICall } from '../../Providers/ServiceProvider';
import './Style.scss';
import { XLg, ArrowRight } from 'react-bootstrap-icons';
import ZivovLogo from '../../Assets/Images/logo.png';
import WelcomeRobo from '../../Assets/Images/welcome_robo.webp';
import PlaystoreIcon from '../../Assets/Images/play_store.webp';
import RazorScript from '../../Components/RazorScript';
import LoaderComponent from '../../Components/Loader';
import { validatePhoneNumber } from '../../Providers/UtilsProvider'
import { withRouter } from 'react-router-dom'

const Plans = (props) => {
    const [planCategory, setPlanCategory] = useState(null);
    const [plans, setPlans] = useState([]);
    const [loader, setLoader] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isValidPh, setIsValidPh] = useState(false);
    const [errorMsgInValidPh, setErrorMsgInValidNumber] = useState('');
    const [selectedPromoCode, setSelectedPromocode] = useState(null);
    const [typedPromoCode, enterPromoCode] = useState('');
    const [errorMsgInValidCoupon, setErrorMsgInValidCoupon] = useState('');
    const [isPhoneNumberDialogVisible, setisPhoneNumberDialogVisible] = useState(false);
    const [hasPaymentFailed, showPaymentFailedErrorDialog] = useState(null);
    const [paymentSuccessResponse, setPaymentSuccessResponse] = useState(null);

    const typePromoCode = (value) => {
        enterPromoCode(value);
        setSelectedPromocode(null);
        setErrorMsgInValidCoupon('')
    }

    function closePhoneNumberDialog(showErrorDialog) {
        setLoader(false);
        setErrorMsgInValidNumber('');
        setisPhoneNumberDialogVisible(false);
        setSelectedPromocode(null);
        setErrorMsgInValidCoupon('');
        setPhoneNumber(null);
        setIsValidPh(false);
        enterPromoCode('');
        setPaymentSuccessResponse(null);
        setSelectedPlan(null);
        if (showErrorDialog) {
            showPaymentFailedErrorDialog(showErrorDialog);
        } else {
            showPaymentFailedErrorDialog(null);
        }
    }

    const openBuyPlanDialog = (plan) => {
        setSelectedPlan({ ...plan });
        setisPhoneNumberDialogVisible(true);
    }

    const enterNumber = (phNumberEntered) => {
        let newNumber = validatePhoneNumber(phNumberEntered);
        setPhoneNumber(newNumber);
    }
    const ValidatePhAndNext = () => {
        if (phoneNumber.length === 10) {
            setIsValidPh(true);
            setErrorMsgInValidNumber('');
        }
        else {
            setPhoneNumber('');
            setIsValidPh(false);
            setErrorMsgInValidNumber('Not a valid Mobile Number');
        }
    }

    const FetchPlans = (Id, doctorID) => {
        let configObj = {
            method: 'post',
            path: 'unAuthenticatedRoutes/getPlans',
            params: { planCategoryId: Id, shouldShowDoctorPlan: doctorID }
        }
        initAPICall(configObj).then((response) => {
            if (response.data.isSuccessful) {
                setPlans(response.data.response.plans); 
                if (response.data.response.plansCategory) {
                    setPlanCategory(response.data.response.plansCategory);
                }
                setLoader(false);
            }

        }, (error) => {
            setLoader(false);
        });
    }

    useEffect(() => {

        if (props.computedMatch && props.computedMatch.params) {
            let doctorId = false;
            if (props.computedMatch.params.docplans) {
                doctorId = props.computedMatch.params.docplans;
            }
          //  alert(JSON.stringify(props.location.state))
            FetchPlans(props.computedMatch.params.category, doctorId);
            if (props.location.state) {
                setPlanCategory(props.location.state);
            }
        }
    }, []);


    const validateTransactionDetail = (isValidateTransaction, razerPaymentResponse, paymentOrderId) => {
        let payableAmount = parseInt(selectedPlan.amount);
        if (selectedPromoCode) {
            payableAmount = payableAmount - parseInt(selectedPromoCode.couponAmount);
        }
        let finalPromocode = null;
        if (selectedPromoCode) {
            finalPromocode = typedPromoCode.trim();
        }

        const path = isValidateTransaction ? 'validateBeforePayment' : 'generateAppAccessToken';
        let configObject = {
            method: 'post',
            params: {
                phoneNumber: phoneNumber.trim(),
                amountPaid: payableAmount,
                fk_g_plan_id: selectedPlan.id,
                couponName: finalPromocode ? finalPromocode : null,
                isValidate: isValidateTransaction,
                paymentChannel: 'web'
            },
            headerType: 'JSON',
            shouldDisplayErrorMessage: true,
            path: 'unAuthenticatedRoutes/' + path,
        };
        setLoader(true);

        // adding params for validating the transation
        if (isValidateTransaction) {
            configObject.params.tmpReceipt = 'tempReceipt';
            configObject.params.tmpNotes = 'tmpNotes';
        } else {
            configObject.params.paymentResponse = razerPaymentResponse;
            configObject.params.orderIdKey = paymentOrderId;
        }

        initAPICall(configObject).then((response) => {
            const { data } = response;
            if (data && data.isSuccessful) {
                if (isValidateTransaction) {
                    setLoader(false);
                    let paymentDetails = JSON.parse(JSON.stringify(data.response.orderDetailObj));
                    makePayment(paymentDetails);
                } else {
                    setisPhoneNumberDialogVisible(false);
                    if (data.response.accessToken) {
                        const { accessToken = null, isValidUser } = data.response;
                        setPaymentSuccessResponse(data.response);
                        if (!isValidUser) {
                            sendActivationCodeSMS(accessToken, phoneNumber.trim());
                        }
                    } else {
                        closePhoneNumberDialog({ title: 'Invalid Transaction', description: data.errorMessage });
                    }
                }
            } else if (data && !data.isSuccessful) {
                closePhoneNumberDialog({ title: 'Invalid Transaction', description: data.errorMessage })
            }
        }, (err) => {
            console.error(err);
        }).finally(() => {
            setLoader(false);
        })
    }

    async function makePayment(paymentConfig) {
        const razerpaySDKLoadResponse = await RazorScript(process.env.REACT_APP_RZPAY);
        if (!razerpaySDKLoadResponse) {
            closePhoneNumberDialog({ title: 'Payment failed', description: 'Failed to connect payment gateway.' });
            return;
        }

        paymentConfig.description = selectedPlan.description;
        paymentConfig.prefill = {
            email: '',
            contact: phoneNumber,
            name: ''
        };
        paymentConfig.confirm_close = true;
        paymentConfig.readonly = {
            contact: true
        };
        paymentConfig.retry = {
            enabled: false
        }
        paymentConfig.handler = (response) => {
            validateTransactionDetail(false, JSON.parse(JSON.stringify(response)), paymentConfig.order_id);
        }
        const paymentObject = new window.Razorpay(paymentConfig);
        paymentObject.open();
        paymentObject.on('payment.failed', (error) => {
            setLoader(true);
            updatePaymentErrorLog(paymentConfig.order_id, error);
        })
    }

    function updatePaymentErrorLog(orderId, checkoutResObj) {
        const configObject = {
            method: 'POST',
            params: {
                orderIdKey: orderId,
                paymentResponse: checkoutResObj,
            },
            headerType: 'JSON',
            shouldDisplayErrorMessage: false,
            path: 'unAuthenticatedRoutes/updatePaymentErrorLog',
        };
        initAPICall(configObject).then((paymentFailedRes) => {
            setLoader(false);
            closePhoneNumberDialog({ title: 'Payment failed', description: paymentFailedRes.error.description });
        }).catch((error) => {
            setLoader(false);
            closePhoneNumberDialog({ title: 'Payment failed', description: 'Payment for the plan failed. Please try again.' });
        });
    }

    function validateCouponAPICall() {
        let couponStr = typedPromoCode.trim();
        if (!couponStr) {
            return;
        }
        const configObject = {
            method: 'post',
            params: {
                couponName: couponStr,
                plan: selectedPlan.id
            },
            headerType: 'JSON',
            shouldDisplayErrorMessage: true,
            path: 'unAuthenticatedRoutes/validateCoupon',
        };
        setLoader(true);
        initAPICall(configObject).then((response) => {
            const { data } = response;
            if (data && data.isSuccessful && data.couponAmount) {
                setSelectedPromocode(data);
            } else {
                setErrorMsgInValidCoupon("Please enter valid promo code.");
            }
        }, (err) => {
            console.error(err);
        }).finally(() => {
            setLoader(false);
        })
    }

    function sendActivationCodeSMS(currentPurchasedActivationCode, SMSphoneNumber, callRedirection) {
        const configObject = {
            method: 'post',
            headerType: 'JSON',
            shouldDisplayErrorMessage: false,
            path: 'unAuthenticatedRoutes/sendActivationCode',
            params: { accessToken: currentPurchasedActivationCode, phoneNumber: SMSphoneNumber },
        };
        setLoader(true);
        initAPICall(configObject).then(
            (successResponse) => {
                setLoader(false);
                if (callRedirection) {
                    closeSuccessDialog(true, false);
                }
            }, (error) => {
                setLoader(false);
                if (callRedirection) {
                    closeSuccessDialog(true, false);
                }
            })
            .catch((errorResponse) => {
                setLoader(false);
                if (callRedirection) {
                    closeSuccessDialog(true, false);
                }
            })
    }

    function updateCurrentUserToPremiumAPICall() {
        const configObject = {
            method: 'post',
            headerType: 'JSON',
            shouldDisplayErrorMessage: true,
            path: 'unAuthenticatedRoutes/AssignAppAccessToken',
            params: { accessToken: paymentSuccessResponse.accessToken.trim(), channel: 'web', phoneNumber: phoneNumber },
        };
        setLoader(true);
        initAPICall(configObject).then(async (successResponse) => {
            setLoader(false);
            if (successResponse) {
                const { data = null } = successResponse;
                if (data && data.isSuccessful) {
                    closeSuccessDialog(true, true);
                } else {
                    closeSuccessDialog(true, false);
                    showPaymentFailedErrorDialog({ title: 'Error', description: "Failed to convert your account into premium account. Please try through Zivov App" });
                }
            }
        }, (error) => {
            setLoader(false);
            closeSuccessDialog(true, false);
            showPaymentFailedErrorDialog({ title: 'Error', description: "Failed to convert your account into premium account. Please try through Zivov App" });
        }).catch((errorResponse) => {
            setLoader(false);
            closeSuccessDialog(true, false);
            showPaymentFailedErrorDialog({ title: 'Error', description: "Failed to convert your account into premium account. Please try through Zivov App" });
        })
    }

    function closeSuccessDialog(isClose, isRedirect) {
        let referLinkInputField = document.getElementById("activationCodeInput");
        if (referLinkInputField) {
            referLinkInputField.select();
            referLinkInputField.setSelectionRange(0, 99999); /*For mobile devices*/
            document.execCommand("copy");
        }
        if (isClose) {
            closePhoneNumberDialog();
            if (isRedirect) {
                props.history.push({
                    pathname: '/home',
                    state: {}
                });
            }
        }
    }

    function genrateRGB(tempVal) {
        return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + 0.2 + ')';
    }

    function generateCostTable() {
        if (selectedPlan) {
            let payableAmount = parseInt(selectedPlan.amount);
            if (selectedPromoCode) {
                payableAmount = payableAmount - parseInt(selectedPromoCode.couponAmount);
            }
            return (
                <Table bordered>
                    <tbody >
                        <tr>
                            <td>Plan Selected</td>
                            <td>{selectedPlan.name}</td>
                        </tr>
                        <tr>
                            <td>Plan Amount</td>
                            <td>{parseInt(selectedPlan.amount)}</td>
                        </tr>
                        {selectedPromoCode && <>
                            <tr>
                                <td>Coupon Discount</td>
                                <td>{selectedPromoCode.couponAmount}</td>
                            </tr>
                        </>}
                        <tr>
                            <td>Final Amount</td>
                            <td>{payableAmount}</td>
                        </tr>
                    </tbody >
                </Table>
            )
        } else {
            return (null);
        }
    }

    return (
        <>
            {
                planCategory ?
                    <>
                        <img alt="plan category" src={planCategory.documentPath ? planCategory.documentPath : "require('@Images/sample.jpg')"} className="categoryPlanDetailImage" />
                        <div className="infoText">
                            <p className="bigTitle_detailPage">{planCategory.name}</p>
                            <p className="big_details">{planCategory.detail}</p>
                            <p className="whatITHas">Inclusions</p>
                        </div>
                        <div className="bullentParentContainer">
                            <Row>
                                {planCategory.bullet_points.map((point, index) => {
                                    return (
                                        <Col xs={12} lg={4} xl={3} sm={6} key={index = "bullenPoints"}>
                                            <div className="categoryPoints" style={{ background: genrateRGB() }}>
                                                <span className="bullentText">{point.val}</span>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </div>
                        <Row className="blogContainer">
                            {plans.map((item, index) => {
                                return (
                                    <Col xs={12} lg={4} xl={3} sm={6} key={index} className="cardContainer2">
                                        <Card className="blogcard">
                                            <Card.Body>
                                                <Card.Title className="planTitle">
                                                    <span className="overflowText"> {item.name}</span>
                                                </Card.Title>
                                                <hr />
                                                <Card.Text className="blogDetail">
                                                    <div className="planDescription">
                                                        <span className="overflowText"> {item.description}</span>
                                                    </div>
                                                    <hr />
                                                    <div className="planPrice">₹ {item.amount}</div>
                                                    <div className="planValidity">Validity {item.days} days</div>
                                                </Card.Text>
                                                <Button onClick={() => openBuyPlanDialog(item)} className="readMore">Buy</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                        {/*phone number and promotional code dialog*/}
                        <Modal
                            show={isPhoneNumberDialogVisible}
                            centered={'md'}
                            animation={false}
                            backdrop="static">
                            <XLg size={20} color="#0069ff" className='closeDialogCross' onClick={() => { closePhoneNumberDialog() }} />
                            <Modal.Body className="phoneNumberDialog">
                                <img src={ZivovLogo}
                                    alt="Zivov"
                                    className="zivovLogo"
                                    height="5rem"
                                />
                                <div className="zivovName">Zivov</div>
                                <div className="getStarted">Get Started</div>
                                <Form onSubmit={() => { }} noValidate>
                                    <Form.Group controlId="formPhone">
                                        {!isValidPh &&
                                            (<>
                                                <Form.Control
                                                    type="text"
                                                    value={phoneNumber}
                                                    maxLength="10"
                                                    placeholder="Mobile Number"
                                                    onChange={(e) => enterNumber(e.target.value)}
                                                    required
                                                    className="modalInputPhoneNumber" />
                                                {errorMsgInValidPh &&
                                                    <div className="errorMessage">{errorMsgInValidPh}</div>
                                                }
                                                <ArrowRight color="#0069ff"
                                                    size={30}
                                                    onClick={() => { ValidatePhAndNext() }}
                                                    className="submitPhoneNumber"
                                                />
                                            </>
                                            )
                                        }
                                        {/*nextInput*/}
                                        {isValidPh &&
                                            <>
                                                {generateCostTable()}
                                                <Row>
                                                    <Col xs={8} lg={8} xl={8} sm={8}>
                                                        <Form.Control
                                                            value={typedPromoCode}
                                                            type="text"
                                                            maxLength="20"
                                                            placeholder="Enter PromoCode(optional)"
                                                            onChange={(e) => typePromoCode(e.target.value)}
                                                            className="modalInputPromoCode" />
                                                    </Col>
                                                    <Col xs={4} lg={4} xl={4} sm={4}>
                                                        <Button onClick={() => validateCouponAPICall()}>Validate</Button>
                                                    </Col>
                                                </Row>
                                                {errorMsgInValidCoupon && <div className="errorMessage">{errorMsgInValidCoupon}</div>}

                                                {loader &&
                                                    <LoaderComponent />
                                                }
                                                <Button className="validatePromoBt" onClick={() => validateTransactionDetail(true)}>Proceed</Button>
                                                <Button variant={'link'} className="skipPromoBt" onClick={() => closePhoneNumberDialog()}>Close</Button>
                                            </>
                                        }
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        {/*payment failed error Dialog*/}
                        {hasPaymentFailed &&
                            <Modal show={hasPaymentFailed} onHide={() => { showPaymentFailedErrorDialog(null) }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{hasPaymentFailed.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {hasPaymentFailed.description}
                                    {loader &&
                                        <LoaderComponent />
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => { showPaymentFailedErrorDialog(null) }}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        }
                        {paymentSuccessResponse &&
                            <Modal
                                show={paymentSuccessResponse}
                                centered
                                animation={false}
                                backdrop="static">
                                <XLg size={20} color="#0069ff" className='closeDialogCross' onClick={() => { closeSuccessDialog(true, false); }} />
                                <Modal.Body className="phoneNumberDialog">
                                    <img src={WelcomeRobo}
                                        alt="welcome"
                                        className="welcomeRobot"
                                    />
                                    <div className="zivovWoo">Woohoo!</div>
                                    <p className="planOtherDetail"> Welcome to Zivov's premium {selectedPlan.name}</p>
                                    <div className="getStarted">
                                        {paymentSuccessResponse.isValidUser && paymentSuccessResponse.hasValidToken && (
                                            <p className="ohterMessageInfo">Thank you for purchasing Zivov Premium! plan - {selectedPlan.name}. To activate the plan please enter below activation code in the Zivov application.</p>
                                        )}
                                        {paymentSuccessResponse.isValidUser && !paymentSuccessResponse.hasValidToken && (
                                            <p className="ohterMessageInfo">  Thank you for purchasing Zivov Premium! Have you purchased this plan for yourself? Or for a family member/friend?</p>
                                        )}
                                        {!paymentSuccessResponse.isValidUser && (
                                            <>
                                                <p className="ohterMessageInfo"> The code to activate the premium plan has been messaged to your mobile number.</p>
                                                <p className="ohterMessageInfo"> Please share this code with your family member/friend so that they can experience Zivov’s awesome features available for Premium users!</p>
                                            </>
                                        )}
                                        <p className="ohterMessageInfo"> Download the Zivov app from the play store</p>
                                        <a className="playstoreIcon" href={process.env.REACT_APP_PLAYSTORE} target="_blank"  rel="noopener">
                                            <img
                                                src={PlaystoreIcon}
                                                alt="profile pic"
                                                className="playstoreIcon"
                                            />
                                        </a>
                                    </div>
                                    <div className="activationCodeBox">
                                        <input id="activationCodeInput" type="text" readonly="readonly" className="activationInputfield" value={paymentSuccessResponse.accessToken} />
                                        <Button className="copyActivationCodeBt" onClick={() => { closeSuccessDialog(false); }}>Copy</Button>
                                    </div>
                                    {loader &&
                                        <LoaderComponent />
                                    }
                                </Modal.Body>
                                <Modal.Footer>
                                    {paymentSuccessResponse.isValidUser && (
                                        <>
                                            <Button variant="secondary" onClick={() => { sendActivationCodeSMS(paymentSuccessResponse.accessToken, phoneNumber, true); }}>
                                                {(paymentSuccessResponse.isValidUser && paymentSuccessResponse.hasValidToken) ? 'ok' : ' For Someone Else'}

                                            </Button>
                                            {!paymentSuccessResponse.hasValidToken && (
                                                <Button variant="primary" onClick={() => { updateCurrentUserToPremiumAPICall() }}>
                                                    For Myself
                                                </Button>
                                            )}
                                        </>
                                    )}
                                    {!paymentSuccessResponse.isValidUser && (
                                        <Button variant="primary" onClick={() => { closeSuccessDialog(true, true); }}>
                                            Ok
                                        </Button>
                                    )}
                                </Modal.Footer>
                            </Modal>
                        }

                    </> : null
            }
        </>
    )
}

export default memo(withRouter(Plans));