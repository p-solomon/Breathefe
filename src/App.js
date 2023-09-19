import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import CreateJob from './components/Vendor/Job/CreateJob';
import HomeBody from './components/Musician/Home/HomeBody';
import { useState } from 'react';
import JobInfo from './components/Musician/Jobs/JobInfo';
import MessageConvo from './components/Message/MessageConvo';
import EngagementPage from './components/Musician/Engagement/EngagementPage';
import InboxBody from './components/Inbox/InboxBody';
import Portfolio from './components/Musician/Portfolio/Portfolio';
import UserPortfolio from './components/Musician/Portfolio/UserPortfolio';
import Quote from './components/Musician/Quote/Quote';
import MusNav from './components/Musician/Nav/MusNav';
import Aside from './components/Musician/Nav/Aside';
import StripePage from './components/Wallet/StripePage';
import ManageJobs from './components/Vendor/Manage/ManageJobs';
import ActiveJobs from './components/Vendor/ActiveJobs/ActiveJobs';
import SearchResult from './components/SearchResult';
import MusicStoresNearMe from './components/MusicStores';
import User from './components/Users/User';
import Google from './components/Google';
import RecommendMusic from './components/RecommendMusic';
import Button from './components/ChatBot/Button';
import Chat from './components/ChatBot/Chat';
import Landing from './components/Landing';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const MainLayout = ({ children }) => {
  const shouldShowNavbar = (pathname) => {
    return !(pathname === "/login" || pathname === "/register");
  };

  const showNavbar = shouldShowNavbar(window.location.pathname);

  return (
    <div className="fixed w-full">
      <Toaster />
      {showNavbar &&
        <>
          <MusNav />
          <Aside />
        </>
      }
      {children}
    </div>
  );
};


function App() {

  const [show, setShow] = useState(false)

  const showBtn = () => {
    setShow(!show)
  }


  return (
    <Router>
      <div className="fixed w-full">

      <Toaster />

        
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Signin} />
          <Route exact path="/" component={Landing} />

          <MainLayout>

          <div style={{marginLeft:"55rem"}} className='fixed bottom-0 left-0 text-center ml-72'>
          <Button show={show} showBtn={showBtn} />
          {show && <Chat />}

          </div>
        

          <Route exact path="/home" component={HomeBody} />
          <Route exact path="/jobs/:id" component={JobInfo} />
          <Route exact path="/quote/:id" component={Quote} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/profile/:id" component={UserPortfolio} />
          <Route exact path="/engagement" component={EngagementPage} />
          <Route exact path="/inbox" component={InboxBody} />
          <Route exact path="/wallet" component={StripePage} />
          <Route exact path="/Message/:id" component={MessageConvo} />
          <Route exact path="/createJob" component={CreateJob} />
          <Route exact path="/manageJobs" component={ManageJobs} />
          <Route exact path="/activeJobs" component={ActiveJobs} />
          <Route path="/search-results" component={SearchResult} />
          <Route path="/topusers" component={User} />
          <Route path="/stores" component={MusicStoresNearMe} />
          <Route path="/google" component={Google} />
          <Route path="/music" component={RecommendMusic} />

          </MainLayout>


        </Switch>

        
      </div>

    </Router>


  );
}

//Always export component function
export default App;
