import React, { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { initAPICall } from '../../Providers/ServiceProvider';
import { withRouter } from 'react-router-dom'
import './Style.scss';


const BlogPage = (props) => {
    const [blogList, setBlogList] = useState([]);
    const [loader, setLoader] = useState(true);

    const FetchBlogList = (event) => {
        let configObj = {
            method: 'get',
            path: 'unAuthenticatedRoutes/get_blog'
        }
        initAPICall(configObj).then((response) => {
            console.log("Hii",response.data.response);
            if (response.data.isSuccessful) {
                setBlogList(response.data.response.blog);
                setLoader(false);
            }

        }, (error) => {
            setLoader(false);
        });
    }

    useEffect(() => {
        FetchBlogList();
    }, []);


    function redirectToDetailPage(blogID) {
        props.history.push (`/blogdetail/${blogID}`) ;
    }

    if (loader) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner animation="border" variant="primary" style={{ fontSize: '1.8rem' }} />
            </div>
        )
    }

    return (
        <div className="parent">
            
            <div className="blogTopSection">
                <div className="blogTopInfo">
                    <div className="infoText">
                        <p className="blogTitle">Zivov Health Blog</p>
                    </div>
                </div>
            </div>

            <Row className="blogContainer">
                <Row className="">
                    {blogList.map((item, index) => {
                        return (
                            <Col xs={12} lg={3} md={6} sm={6} key={index} className="cardContainer">
                                <Card className="blogcard">
                                    <Card.Img variant="top" className="blogImage" src={item.image ? item.image : "require('@Images/sample.jpg')"} />
                                    <Card.Body>
                                        <Card.Title className="blogTitle" >
                                            <LinesEllipsis
                                                text={item.title}
                                                maxLine='2'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters'
                                            />
                                        </Card.Title>
                                        <Card.Text className="blogDetail">
                                            <LinesEllipsis
                                                text={item.sub_title}
                                                maxLine='3'
                                                ellipsis='...'
                                                trimRight
                                                basedOn='letters'
                                                style={{color:"black"}}
                                            />
                                        </Card.Text>
                                         
                                        <Button onClick={() => { redirectToDetailPage(item.id) }} className="readMore">Read More</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Row >
        </div>
    );

}

export default  withRouter(BlogPage);