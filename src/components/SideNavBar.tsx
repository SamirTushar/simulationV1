import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideNavBar.scss';

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState('worldengine');
  const [showReports, setShowReports] = useState(false);
  const [showRiskAi, setShowRiskAi] = useState(false);
  const [showResilience, setShowResilience] = useState(false);
  const [showGAURI, setShowGAURI] = useState(false);
  const [showDT, setShowDT] = useState(false);
  const [showSwe, setShowSwe] = useState(false);

  const onClickSideNav = (url: string, activeSection: string) => {
    if (activeSection === 'worldengine') {
      navigate(url);
      setSelectedNav(activeSection);
    }
    // Other modules are placeholders for now
  };

  useEffect(() => {
    // Check current route and set active nav
    const path = location.pathname;
    if (path === '/' || path.indexOf('simulation') >= 0 || path.indexOf('compare') >= 0 || path.indexOf('create') >= 0) {
      setSelectedNav('worldengine');
    }
  }, [location.pathname]);


  return (
    <nav className='side-navbar' id='sideNavBar'>
      <button className='main-logo' id='mainLogo' title="3SC Executive Simulations">
        <img src="/3sc-Logo.svg" alt="3SC" />
      </button>

      {/* Command Center */}
      <button
        className={'sidenav-logo'}
        onMouseEnter={() => setShowReports(true)}
        onMouseLeave={() => setShowReports(false)}
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        title="Command Center (Coming Soon)"
      >
        <img src="/CC.svg" alt="Command Center" />
      </button>
      {showReports && (
        <div className='hover-reports' id='hoverResilience'>
          <span className='hover-report-lefttriangle' id='HoverReportLefttriangle'></span>
          <span className='hover-report-content' id='hoverReportContent'>
            Command Center
          </span>
        </div>
      )}

      {/* Disruption Management */}
      <button
        className={'sidenav-logo'}
        onMouseEnter={() => setShowRiskAi(true)}
        onMouseLeave={() => setShowRiskAi(false)}
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        title="Disruption Management (Coming Soon)"
      >
        <img src="/DM.svg" alt="Disruption Management" />
      </button>
      {showRiskAi && (
        <div className='hover-riskai' id='hoverRiskai'>
          <span className='hover-riskai-lefttriangle' id='HoverRiskaiLefttriangle'></span>
          <span className='hover-riskai-content' id='hoverRiskaiContent'>
            Disruption Management
          </span>
        </div>
      )}

      {/* Risk Management */}
      <button
        className='res-logo'
        onMouseEnter={() => setShowResilience(true)}
        onMouseLeave={() => setShowResilience(false)}
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        title="Risk Management (Coming Soon)"
      >
        <img src="/RM.svg" alt="Risk Management" />
      </button>
      {showResilience && (
        <div className='hover-resilience' id='hoverReports'>
          <span className='hover-report-lefttriangle' id='HoverReportLefttriangle'></span>
          <span className='hover-resilience-content' id='hoverReportContent'>
            Risk Management
          </span>
        </div>
      )}

      {/* GAURI */}
      <button
        className='gauri-logo'
        onMouseEnter={() => setShowGAURI(true)}
        onMouseLeave={() => setShowGAURI(false)}
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        title="GAURI (Coming Soon)"
      >
        <img src="/Gauri.svg" alt="GAURI" />
      </button>
      {showGAURI && (
        <div className='hover-gauri' id='hoverGauri'>
          <span className='hover-report-lefttriangle' id='HoverReportLefttriangle'></span>
          <span className='hover-gauri-content' id='hoverGauriContent'>
            GAURI
          </span>
        </div>
      )}

      {/* Digital Twin */}
      <button
        className={'sidenav-logo'}
        onMouseEnter={() => setShowDT(true)}
        onMouseLeave={() => setShowDT(false)}
        style={{ opacity: 0.5, cursor: 'not-allowed' }}
        title="Digital Twin (Coming Soon)"
      >
        <img src="/DT.svg" alt="Digital Twin" />
      </button>
      {showDT && (
        <div className='hover-dt' id='hoverDT'>
          <span className='hover-report-lefttriangle' id='HoverReportLefttriangle'></span>
          <span className='hover-report-content' id='hoverReportContent'>
            Digital Twin
          </span>
        </div>
      )}

      {/* SWE Module - Active (Supply Chain Simulation) */}
      <button
        className={selectedNav === 'worldengine' ? 'hover-swe-content-active' : 'hover-swe-content'}
        onMouseEnter={() => setShowSwe(true)}
        onMouseLeave={() => setShowSwe(false)}
        onClick={() => onClickSideNav('/', 'worldengine')}
        title="Simulation World Engine"
      >
        SWE
      </button>
      {showSwe && (
        <div className='hover-swe' id='hoverSwe'>
          <span className='hover-swe-lefttriangle' id='HoverReportLefttriangle'></span>
          <span className='hover-swe-tooltip-content' id='hoverReportContent'>
            Simulation World Engine
          </span>
        </div>
      )}
    </nav>
  );
};

export default SideNavBar;
