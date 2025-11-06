import React from 'react';
//import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import './SideNavBar.scss';

import rmlogo from '/DM.svg';
import rmActivelogo from '/DM-hover.svg';
import report from '/CC.svg';
import reportActive from '/CC-hover.svg';
import resiliencelogo from '/RM.svg';
import resActiveLogo from '/RM-hover.svg';
import gauriLogo from '/Gauri.svg';
import gauriActiveLogo from '/Gauri-hover.svg';
import dtLogo from '/DT.svg';
import dtActiveLogo from '/DT-hover.svg';



//import { setIsLoggedIn } from '../../store/slices/loginSlice';

const SideNavBar = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [selectedNav, setSelectedNav] = useState('riskai');
  const [showReports, setShowReports] = useState(false);
  const [showRiskAi, setShowRiskAi] = useState(false);
  const [showResilience, setShowResilience] = useState(false);
  const [showGAURI, setShowGAURI] = useState(false);
  const [showDT, setShowDT] = useState(false);
  const [showSwe, setShowSwe] = useState(false);

  // const CheckOut = () => {
  //   dispatch(setIsLoggedIn(null));
  //   localStorage.setItem('isloggedin', false);
  //   navigate('/riskai')
  // }

  const onClickSideNav = (url, activeSection) => {
    navigate(url);
    setSelectedNav(activeSection);
  }

  // const openResilience = () => {
  //   const newWindow = window.location.assign('https://demo-rm.3sc.ai/resilienceoverall');
  //   if (newWindow) {
  //     newWindow.focus();
  //   } else {
  //     console.error('Popup was blocked by the browser');
  //     // Handle this scenario
  //   }
  // }

  // const openCC = () => {
  //   const newWindow = window.location.assign('https://demo-rm.3sc.ai/reports');
  //   if (newWindow) {
  //     newWindow.focus();
  //   } else {
  //     console.error('Popup was blocked by the browser');
  //     // Handle this scenario
  //   }
  // }


    const openDT = () => {
      const newWindow = window.location.assign('https://riskai-demo-dt.3sc.ai/');
      if (newWindow) {
        newWindow.focus();
      } else {
        console.error('Popup was blocked by the browser');
        // Handle this scenario
      }
    }

    // const openRM = () => {
    //   const newWindow = window.location.assign('https://demo-rm.3sc.ai/');
    //   if (newWindow) {
    //     newWindow.focus();
    //   } else {
    //     console.error('Popup was blocked by the browser');
    //     // Handle this scenario
    //   }
    // }

    // const openGAURI = () => {
    //   const newWindow = window.location.assign('https://demo-rm.3sc.ai/gauri/');
    //   if (newWindow) {
    //     newWindow.focus();
    //   } else {
    //     console.error('Popup was blocked by the browser');
    //     // Handle this scenario
    //   }
    // }

  useEffect(() => {
    if(window.location.href.indexOf('reports') >= 0) {
      setSelectedNav('reports');
    } else if(window.location.href.indexOf('riskai') >= 0) {
      setSelectedNav('riskai');
    } else if(window.location.href.indexOf('riskdetails') >= 0) {
      setSelectedNav('riskai');
    } else if(window.location.href.indexOf('resilience') >= 0)  {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('supplier') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('manufacturing') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('transportation') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('warehouse') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('customer') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('fginventory') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('rminventory') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('demand') >= 0) {
      setSelectedNav('resilience');
    } else if(window.location.href.indexOf('gauri') >= 0)  {
      setSelectedNav('gauri');
    } else if(window.location.href.indexOf('dtrm') >= 0) {
      setSelectedNav('dt');
    } else if(window.location.href.indexOf('worldengine') >= 0) {
      setSelectedNav('worldengine');
    } else if(window.location.href.indexOf('simulationresults') >= 0) {
      setSelectedNav('worldengine');
    }
    else {
      setSelectedNav('riskai');
    }
  }, [selectedNav])

  return (
    <nav 
      className='side-navbar'
      id='sideNavBar'
      >
      <button 
        className='main-logo' 
        id='mainLogo'
      ></button>
      {/* <p 
        className='tab-heading' 
        id='tabHeading'
      >
         RISK MANAGEMENT
      </p> */}
      {/* <button onClick={openRM}>
        RM
      </button>
      <button onClick={openResilience}>
        Resilience
      </button>
      <button onClick={openCC}>
        Reports
      </button>
      <button onClick={openGAURI}>
        GAURI
      </button> */}
        <button 
          className={'sidenav-logo'}
          // onClick={openCC}
          onClick={() => onClickSideNav('/reports','reports')}
          onMouseEnter={() => setShowReports(true)}
          onMouseLeave={() => setShowReports(false)}
        >
          <img src={selectedNav === 'reports' ? reportActive : report} alt='Reports'/>
          {/* <label className='tab-heading' >REPORTS</label> */}
        </button>
        {showReports && <div 
          className='hover-reports'
          id='hoverResilience'
        >
          <span 
            className='hover-report-lefttriangle'
            id='HoverReportLefttriangle'
          ></span>
          <span
            className='hover-report-content'
            id='hoverReportContent'
          >
            Command Center
          </span>
        </div>}
        <button 
          className={'sidenav-logo'}
          // onClick={openRM}
          onClick={() => onClickSideNav('/riskai','riskai')}
          onMouseEnter={() => setShowRiskAi(true)}
          onMouseLeave={() => setShowRiskAi(false)}
        >
          <img src={selectedNav === 'riskai' ? rmActivelogo : rmlogo} alt='Risk Management'/>
          {/* <label className='tab-heading' >RISK MANAGEMENT</label> */}
        </button>
        {showRiskAi && <div 
          className='hover-riskai'
          id='hoverRiskai'
        >
          <span 
            className='hover-riskai-lefttriangle'
            id='HoverRiskaiLefttriangle'
          ></span>
          <span
            className='hover-riskai-content'
            id='hoverRiskaiContent'
          >
            Disruption Management
          </span>
        </div>}
        <button 
          //className={'sidenav-logo'}
          className='res-logo'
          // onClick={openResilience}
          onClick={() => onClickSideNav('/resilienceoverall','resilience')}
          onMouseEnter={() => setShowResilience(true)}
          onMouseLeave={() => setShowResilience(false)}
        >
          <img src={selectedNav === 'resilience' ? resActiveLogo : resiliencelogo} alt='Resilience Monitoring'/>
          {/* <img src={Resiliencelogo} alt='Resilience'/> */}
        </button>
        {showResilience && <div 
          className='hover-resilience'
          id='hoverReports'
        >
          <span 
            className='hover-report-lefttriangle'
            id='HoverReportLefttriangle'
          ></span>
          <span
            className='hover-resilience-content'
            id='hoverReportContent'
          >
            Resilience Monitoring 
          </span>
        </div>}
        
        <button 
          className='gauri-logo' 
          onMouseEnter={() => setShowGAURI(true)} 
          onMouseLeave={() => setShowGAURI(false)}
          onClick={() => onClickSideNav('/gauri','gauri')}
          // onClick={openGAURI}
        >
          <img src={selectedNav === 'gauri' ? gauriActiveLogo : gauriLogo} alt='GAURI'/>
        </button>
        {showGAURI && <div 
          className='hover-gauri'
          id='hoverGauri'
        >
          <span 
            className='hover-report-lefttriangle'
            id='HoverReportLefttriangle'
          ></span>
          <span
            className='hover-gauri-content'
            id='hoverGauriContent'
          >
            GAURI
          </span>
        </div>}
        <button 
          className={'sidenav-logo'}
          onClick={openDT}
          onMouseEnter={() => setShowDT(true)}
          onMouseLeave={() => setShowDT(false)}
        >
          <img src={selectedNav === 'dt' ? dtActiveLogo : dtLogo} alt='Digital Twin'/>
          {/* <label className='tab-heading' >REPORTS</label> */}
        </button>
        {showDT && <div 
          className='hover-dt'
          id='hoverDT'
        >
          <span 
            className='hover-report-lefttriangle'
            id='HoverReportLefttriangle'
          ></span>
          <span
            className='hover-report-content'
            id='hoverReportContent'
          >
            Digital Twin
          </span>
        </div>}
        <button 
          className={selectedNav === 'worldengine' ? 'hover-swe-content-active' : 'hover-swe-content'}
          onMouseEnter={() => setShowSwe(true)}
          onMouseLeave={() => setShowSwe(false)}
          onClick={() => onClickSideNav('/worldengine', 'worldengine')}
        >
            SWE
        </button>
        {showSwe && <div
          className='hover-swe'
          id='hoverSwe'
        >
          <span
            className='hover-swe-lefttriangle'
            id='HoverReportLefttriangle'
          ></span>
          <span
            className='hover-swe-tooltip-content'
            id='hoverReportContent'
          >
            Simulation World Engine
          </span>
        </div>}
        {/* <button 
          className='menu-user'
          id='menuUser' 
          onMouseEnter={onHoverUserIcon} 
          onMouseLeave={onHoverUserIcon}>
        </button>
        <button 
          className='menu-logout' 
          id='menuLogout'
          onClick={(CheckOut)}>
        </button> */}
      {/* <div 
        className={location.pathname === '/riskdetails' ?' version-risktable' : 'version-main'}
      >
        <img 
          src={Logout} 
          alt='logout-icon' 
          onClick={CheckOut}
        />
      </div>  */}
      {/* {isSOEVisible && 
        <div style={{top:"120px",position:"absolute"}}>
          <MenuName menuname="S&OE"/>
        </div>}
      {isDTVisible && 
        <div 
          className='menu-digital-twin' 
          id='menuDigitalTwin'
        >
          <MenuName menuname="Digital Twin"/>
        </div>}
      {isRMVisible && 
        <div style={{top:"270px",position:"absolute",width:"250px"}}>
          <MenuName menuname="Risk Management"/>
        </div>}
      {isUserDetailsVisible && 
          <div 
            className='user-menu-name' 
            id='userMenuNameContainer'
          >
            <div 
              className='user-menu-left-triangle' 
              id='userMenuLeftTriangle'
            >
            </div>
            <div 
              className='user-menu-main'
              id='userMenuMain'
            >
              <p>Mohneesh Saxena</p>
              <p 
                className='user-detail-emailandid' 
                id='userDetailEmail'
              >
                mohneesh@3scsolution.com
              </p>
              <p 
                className='user-detail-emailandid' 
                id='userDetailid'
              >
                ID:3SC130121
              </p>
            </div>
          </div>
        } */}
    </nav>
  )
}

export default SideNavBar;
