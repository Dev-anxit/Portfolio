import React, { useEffect } from 'react';

const LinkedInBadge = () => {
  useEffect(() => {
    // Load LinkedIn badge script
    const script = document.createElement('script');
    script.src = 'https://platform.linkedin.com/badges/js/profile.js';
    script.async = true;
    script.defer = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <div 
        className="badge-base LI-profile-badge" 
        data-locale="en_US" 
        data-size="large" 
        data-theme="dark" 
        data-type="HORIZONTAL" 
        data-vanity="ankit-kumar-baa77a285" 
        data-version="v1"
      >
        <a 
          className="badge-base__link LI-simple-link" 
          href="https://in.linkedin.com/in/ankit-kumar-baa77a285?trk=profile-badge"
        >
          Ankit Kumar
        </a>
      </div>
    </div>
  );
};

export default LinkedInBadge;
