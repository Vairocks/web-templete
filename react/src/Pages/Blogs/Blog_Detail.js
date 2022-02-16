import React, { useEffect, useState } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import { Spinner } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import { initAPICall } from '../../Providers/ServiceProvider';
import './Style.scss';

const BlogDetail = (props) => {
    const [blogDetail, setBlogDetail] = useState({});
    const [loader, setLoader] = useState(true);
    const FetchBlogDetail = (Id) => {

        let configObj = {
            method: 'post',
            path: 'unAuthenticatedRoutes/GetBlogsDetail',
            params: { blogId: Id }
        }
        initAPICall(configObj).then((response) => {
            if (response.data.isSuccessful) {
                setBlogDetail(response.data.response.blog);
                setLoader(false);
            }

        }, (error) => {
            setLoader(false);
        });

    }
    useEffect(() => {
        if (props.computedMatch && props.computedMatch.params) {
            FetchBlogDetail(props.computedMatch.params.blog);
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
                <img src={blogDetail.image ? blogDetail.image : "require('@Images/sample.jpg')"} className="blogImageTop" />
                <div className="blogTopInfo">
                    <div className="infoText">
                        <p className="blogTitle">
                            <LinesEllipsis
                                text={blogDetail.title}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div className="blogContainer" style={{color:"#212529",marginTop:0}}>
                <span className="blogDetails2">
                    <div className="blogTitle3">{blogDetail.sub_title}  </div>
                    <div className="blogDetail2">
                        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(blogDetail.description) }}></p>
                    </div>
                </span>
            </div>
        </>
    )
}

export default BlogDetail;