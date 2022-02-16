import React, { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Spinner, Container,Row,Col,Card } from 'react-bootstrap'; 
import { initAPICall } from '../../Providers/ServiceProvider';
import './Style.scss';
import { CheckCircle } from 'react-bootstrap-icons';

const Plans = (props) => {
    const [planCategory,setPlanCategory] = useState({});
    const [plans, setPlans] = useState([]);
    const [loader, setLoader] = useState(true);
    
    const FetchPlans = (Id,isFromCategory) => { 
        let configObj = {
            method: 'post',
            path: 'unAuthenticatedRoutes/getPlans',
            params: { planCategoryId: Id,shouldShowDoctorPlan:isFromCategory?false:true }
        }
        initAPICall(configObj).then((response) => {
            console.log(response);
            if (response.data.isSuccessful) {
                setPlans(response.data.response.plans);
                setLoader(false);
            }

        }, (error) => {
            setLoader(false);
        });

    }
    useEffect(() => {
        alert(props.computedMatch.params.category)
        if (props.computedMatch && props.computedMatch.params) {
            alert(props.computedMatch.params.category)
           // FetchPlans(props.computedMatch.params.category,props.location.isFromCategory);
            //setPlanCategory(props.location.state); 
        }
    }, []);


    if (loader) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner animation="border" variant="primary" style={{ fontSize: '1.8rem' }} />
            </div>
        )
    }
    return (
        <>
            <div className="blogTopSectionDetail" style={{marginBottom:0}}>
                <div className="shadowBackground"></div>
                <img src={planCategory.documentPath ? planCategory.documentPath : "require('@Images/sample.jpg')"} className="blogImageTop" />
                <div className="blogTopInfo">
                    <div className="infoText">
                        <p className="blogTitle">
                            <LinesEllipsis
                                text={planCategory.name}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div className="blogContainer" style={{color:"#212529",paddingTop:"2rem",marginTop:0}}>
                <span className="blogDetails2">
                    <div className="blogTitle3" style={{fontSize:"1.5rem"}}>{planCategory.detail}  </div>
                    {planCategory.bullet_points.map((point,indx) => {
                                            return(
                                            
                                            <div key={indx} style={{fontSize:"1.3rem"}}><CheckCircle color="green" size="1rem" style={{backgroundColor:"transparent",borderRadius:"15%",marginRight:"1rem"}} />{point.val}</div>    
                                            
                    )})}
                </span>
            </div>
            <Row className="blogContainer">
    
                    {plans.map((item, index) => {
                        return (
                            <Col xs={6} lg={3} md={3} sm={4} key={index} className="cardContainer2" key={index}>
                                <Card className="blogcard">
                                    
                                    <Card.Body>
                                        <Card.Title className="blogTitle" >
                                            <div>{item.name}</div>
                                        </Card.Title>
                                        <Card.Text className="blogDetail">
                                            <div>₹ {item.amount}</div>
                                            <div>Validity {item.days} days</div>
                                            <div>{item.description}</div>                         
                                        </Card.Text>
                                        
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
    
            </Row >

        </>
    )
}

export default Plans;