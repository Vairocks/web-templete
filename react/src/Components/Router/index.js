import React, {  memo } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PageSpinner from '../Loader';
import { MainLayout } from '../Layout'; 
import Constant from '../../Providers/ConstantProvider';
import HomePage from '../../Pages/Home'
const DoctorPage = React.lazy(() => import('../../Pages/Doctor'));
//const ReferPage = React.lazy(() => import('../../Pages/Refer/'));
const ReferDetailPage = React.lazy(() => import('../../Pages/Refer_Detail/'));
const Blog = React.lazy(() => import('../../Pages/Blogs/'));
const BlogDetail = React.lazy(() => import('../../Pages/Blogs/Blog_Detail'));
const TermsAndConditlion = React.lazy(() => import('../../Pages/TermsAndCondition'));
const Privacy = React.lazy(() => import('../../Pages/Privacy'));
const PlanCatogry = React.lazy(() => import('../../Pages/PlanCategory'));
const Plans = React.lazy(() => import('../../Pages/PlanCategory/Plans'));
const LandingPage = React.lazy(() => import('../../Pages/LandingPage')); 


const App = memo((props) => {
    let regex = new RegExp("[\\?&]invite_code=([^&#]*)");
    let results = regex.exec(window.location.href);
    Constant.invitationCode = results === null
        ? ""
        : decodeURIComponent(results[1]);
    return (
        <React.Suspense fallback={<PageSpinner />}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                    <MainLayout path="/home" isBackgroundVideoRequired={true} component={HomePage} pageHeaderTitle={'mainPage'} {...props} />
                    </Route>
                    <MainLayout path="/home" isBackgroundVideoRequired={true} component={HomePage} pageHeaderTitle={'mainPage'} {...props} />
                    <MainLayout path="/doctorPage" component={DoctorPage} pageHeaderTitle={'doctorPage'} {...props} />
                    <MainLayout path="/referdetail" component={ReferDetailPage} pageHeaderTitle={'referDetailPage'} {...props} />
                    <MainLayout path="/blog" component={Blog} pageHeaderTitle={'blogPage'} {...props} />
                    <MainLayout path="/blogdetail/:blog"
                        component={BlogDetail}
                        pageHeaderTitle={'blogDetailPage'}
                        {...props}
                    />
                    <MainLayout path="/planCategory" component={PlanCatogry} pageHeaderTitle={'PlansCategoryPage'} {...props} />
                    <MainLayout path="/plans/:category"
                        component={Plans}
                        pageHeaderTitle={'PlansPage'}
                        {...props}
                    />
                     <MainLayout path="/docPlans/:category/:docplans"
                        component={Plans}
                        pageHeaderTitle={'DoctorPlans'}
                        {...props}
                    />
                    <MainLayout path="/termscondition" component={TermsAndConditlion} pageHeaderTitle={'termspage'} {...props} />
                    <MainLayout path="/privacypolicy" component={Privacy} pageHeaderTitle={'Privacy'} {...props} />
                    <LandingPage path="/welcome"  {...props} /> 
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </React.Suspense>
    );
});

export default App;
