import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import './Style.scss';
import logo from '../../../Assets/Images/zivov_logo_blue.webp';
import { withRouter, Link } from 'react-router-dom'
const View = (props) => {

    function scrollToSection(id) {
        // if (window.location.pathname !== '/home') {
        //     props.history.push({
        //         pathname: '/home',
        //         state: {}
        //     });
        //     return;
        // }
        var elmnt = document.getElementById(id);
        if (elmnt) {
            elmnt.scrollIntoView({
                behavior: "smooth"
            });
        }
    }

    // function gotoCheckStatusPage() {
    //     props.history.push({
    //         pathname: '/referdetail',
    //         state: {}
    //     });
    // }

    return (
        <Navbar sticky="top"  className="navigationBar navbar navbar-light" expand="lg">
            <Navbar.Brand as={Link} to="/home" onClick={() => { scrollToSection('aboutSection') }}>
                <img
                    alt={"Zivov Logo"}
                    src={logo}
                    className="logo"
                    />
    
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:"white",backgroundColor:"white",borderColor:"white"}} />
            <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
                <Nav>
                    <Nav.Link as={Link} to="/home" className="navlinkWeb" onClick={() => { scrollToSection('homeSection') }}>Home</Nav.Link>
                    {/* <Nav.Link as={Link} to="/home" className="navlinkWeb" onClick={() => { scrollToSection('aboutSection') }}>About</Nav.Link> */}
                    <Nav.Link as={Link} to="/home" className={`navlinkWeb`} onClick={() => { scrollToSection('heatlthGoalsSection') }}>About</Nav.Link>
                    <Nav.Link as={Link} to="/home" className={`navlinkWeb`} onClick={() => { scrollToSection('TheAppSection') }}>The Platform </Nav.Link>
                    {/* <Nav.Link as={Link} to="/home" onClick={() => { scrollToSection('personalisationSection') }} className="navlinkWeb" >Unmatched Personalization</Nav.Link>
                    <Nav.Link as={Link} to="/home" className="navlinkWeb" onClick = {() => { scrollToSection('TransformationsSection') }}>Transformations</Nav.Link>
                    <Nav.Link as={Link} to="/home" className="navlinkWeb" onClick = {() => { scrollToSection('contactSection') }}>Contact</Nav.Link>*/}
                    <Nav.Link as={Link} to="/planCategory" className="navlinkWeb" >Plans</Nav.Link> 
                    <Nav.Link as={Link} to="/doctorPage" className="navlinkWeb" >For Doctors</Nav.Link>
                    <Nav.Link as={Link} to="/blog" className="navlinkWeb" >Blogs</Nav.Link>
                    </Nav>
                    <Nav.Link as={Link} to="/home" className="bookSession" onClick={() => { scrollToSection('contactSection')}}>BOOK FREE SESSION</Nav.Link>
                    {/* <span style={{border:"1px solid rgba(255,255,255,1)",backgroundColor:"white",color:"#011f40",borderRadius:"15%/50%",padding:"0.8em",fontWeight:"bold",marginLeft:"auto"}} onClick={() => { scrollToSection('contactSection')}}>BOOK FREE SESSION</span> */}
            </Navbar.Collapse>
        </Navbar>
    );
};


View.propTypes = {
    pageHeaderTitle: PropTypes.string.isRequired
};

export default withRouter(View);

