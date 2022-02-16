import React, { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { initAPICall } from '../../Providers/ServiceProvider';
import { withRouter } from 'react-router-dom'
import './Style.scss';


const PlansPage = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [loader, setLoader] = useState(true);

    const FetchCategoryList = (event) => {
        let configObj = {
            method: 'get',
            path: 'unAuthenticatedRoutes/getPlanCategory'
        }
        initAPICall(configObj).then((response) => {
            // console.log("Hii",response.data.response.category);
            if (response.data.isSuccessful) {
                setCategoryList(response.data.response.category);
                setLoader(false);
            }

        }, (error) => {
            setLoader(false);
        });
    }

    useEffect(() => {
        FetchCategoryList();
    }, []);


    function redirectToDetailPage(Id, item, isFromCategory) {
        props.history.push({ pathname: `/plans/${Id}`, state: item, isFromCategory: isFromCategory })
    }

    if (loader) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner animation="border" variant="primary" style={{ fontSize: '1.8rem' }} />
            </div>
        )
    }

    return (
        <>
            <div className="infoText">
                <p className="smallTitle">Take the first step to better health</p>
                <p className="bigTitle">Zivov Health Plans</p>
            </div>
            <Row className="blogContainer">
                <Row className="">
                    {categoryList.map((item, index) => {
                        return (
                            <Col xs={12} lg={4} xl={3} sm={6} key={index} className="cardContainer">
                                <Card className="blogcard">
                                    <Card.Img variant="top" className="blogImage" src={item.documentPath ? item.documentPath : "require('@Images/sample.jpg')"} />
                                    <Card.Body>
                                        <Card.Title className="blogTitle" >
                                            <span className="overflowText">{item.name} </span>
                                        </Card.Title>
                                        <Card.Text className="blogDetail">
                                            <LinesEllipsis
                                                text={item.detail}
                                                maxLine='2'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters'
                                                style={{ color: "black" }}
                                            />
                                        </Card.Text>
                                        <Button onClick={() => { redirectToDetailPage(item.id, item, true) }} className="readMore">Check All Plans</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Row >
        </>
    );

}

export default withRouter(PlansPage);