import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideNavBar.scss';

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState('worldengine');

  const onClickSideNav = (url: string, activeSection: string) => {
    if (activeSection === 'worldengine') {
      navigate(url);
      setSelectedNav(activeSection);
    }
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path.indexOf('simulation') >= 0 || path.indexOf('compare') >= 0 || path.indexOf('create') >= 0) {
      setSelectedNav('worldengine');
    }
  }, [location.pathname]);


  return (
    <nav className='side-navbar' id='sideNavBar'>
      <button className='main-logo' id='mainLogo'>
        <img src="/3sc-Logo.svg" alt="3SC" />
      </button>

      <button className='sidenav-logo'>
        <img src="/CC.svg" alt="Command Center" />
      </button>

      <button className='sidenav-logo'>
        <img src="/DM.svg" alt="Disruption Management" />
      </button>

      <button className='res-logo'>
        <img src="/RM.svg" alt="Risk Management" />
      </button>

      <button className='gauri-logo'>
        <img src="/Gauri.svg" alt="GAURI" />
      </button>

      <button className='sidenav-logo'>
        <img src="/DT.svg" alt="Digital Twin" />
      </button>

      <button
        className={selectedNav === 'worldengine' ? 'hover-swe-content-active' : 'hover-swe-content'}
        onClick={() => onClickSideNav('/', 'worldengine')}
      >
        SWE
      </button>
    </nav>
  );
};

export default SideNavBar;
