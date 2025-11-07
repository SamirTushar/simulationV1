import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideNavBar.scss';

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState('dt');

  const onClickSideNav = (url: string, activeSection: string) => {
    if (activeSection === 'worldengine') {
      navigate(url);
      setSelectedNav(activeSection);
    }
  };

  const openResilience = () => {
    window.location.assign('https://riskai-demo-rm.3sc.ai/resilienceoverall');
  };

  const openCC = () => {
    window.location.assign('https://riskai-demo-rm.3sc.ai/reports');
  };

  const openDT = () => {
    window.location.assign('https://riskai-demo-dt.3sc.ai/');
  };

  const openRM = () => {
    window.location.assign('https://riskai-demo-rm.3sc.ai/');
  };

  const openGAURI = () => {
    window.location.assign('https://riskai-demo-rm.3sc.ai/gauri/');
  };

  const openSWE = () => {
    window.location.assign('https://riskai-demo-rm.3sc.ai/worldengine/');
  };

  useEffect(() => {
    // Check current route and set active nav based on URL
    if (window.location.href.indexOf('reports') >= 0) {
      setSelectedNav('reports');
    } else if (window.location.href.indexOf('riskai') >= 0) {
      setSelectedNav('riskai');
    } else if (window.location.href.indexOf('riskdetails') >= 0) {
      setSelectedNav('riskai');
    } else if (window.location.href.indexOf('resilience') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('supplier') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('manufacturing') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('transportation') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('warehouse') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('customer') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('fginventory') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('rminventory') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('demand') >= 0) {
      setSelectedNav('resilience');
    } else if (window.location.href.indexOf('gauri') >= 0) {
      setSelectedNav('gauri');
    } else if (window.location.href.indexOf('dtrm') >= 0) {
      setSelectedNav('dt');
    } else if (window.location.href.indexOf('worldengine') >= 0) {
      setSelectedNav('worldengine');
    } else if (window.location.href.indexOf('simulationresults') >= 0) {
      setSelectedNav('worldengine');
    } else {
      // Check local routes for SWE
      const path = location.pathname;
      if (path === '/' || path.indexOf('simulation') >= 0 || path.indexOf('compare') >= 0 || path.indexOf('create') >= 0) {
        setSelectedNav('worldengine');
      } else {
        setSelectedNav('dt');
      }
    }
  }, [location.pathname, selectedNav]);


  return (
    <nav className='side-navbar' id='sideNavBar'>
      <button className='main-logo' id='mainLogo'>
        <img src="/3sc-Logo.svg" alt="3SC" />
      </button>

      {/* Command Center */}
      <button
        className={'sidenav-logo'}
        onClick={openCC}
        title="Command Center"
      >
        <img src={selectedNav === 'reports' ? '/CC-hover.svg' : '/CC.svg'} alt="Command Center" />
      </button>

      {/* Disruption Management */}
      <button
        className={'sidenav-logo'}
        onClick={openRM}
        title="Disruption Management"
      >
        <img src={selectedNav === 'riskai' ? '/DM-hover.svg' : '/DM.svg'} alt="Disruption Management" />
      </button>

      {/* Resilience Monitoring */}
      <button
        className='res-logo'
        onClick={openResilience}
        title="Resilience Monitoring"
      >
        <img src={selectedNav === 'resilience' ? '/RM-hover.svg' : '/RM.svg'} alt="Resilience Monitoring" />
      </button>

      {/* GAURI */}
      <button
        className='gauri-logo'
        onClick={openGAURI}
        title="GAURI"
      >
        <img src={selectedNav === 'gauri' ? '/Gauri-hover.svg' : '/Gauri.svg'} alt="GAURI" />
      </button>

      {/* Digital Twin */}
      <button
        className={'sidenav-logo'}
        onClick={openDT}
        title="Digital Twin"
      >
        <img src={selectedNav === 'dt' ? '/DT-hover.svg' : '/DT.svg'} alt="Digital Twin" />
      </button>

      <button
        className={selectedNav === 'worldengine' ? 'hover-swe-content-active' : 'hover-swe-content'}
        onClick={() => {
          // Check if we're on local routes, use navigate, otherwise use external URL
          const path = location.pathname;
          if (path === '/' || path.indexOf('simulation') >= 0 || path.indexOf('compare') >= 0 || path.indexOf('create') >= 0) {
            onClickSideNav('/', 'worldengine');
          } else {
            openSWE();
          }
        }}
        title="Simulation World Engine"
      >
        SWE
      </button>
    </nav>
  );
};

export default SideNavBar;
