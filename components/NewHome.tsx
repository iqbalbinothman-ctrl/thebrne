import React from 'react';
import CinematicHero from './CinematicHero';
import GuaranteeStrip from './GuaranteeStrip';
import IdolSection from './IdolSection';
import IdolBeliefSection from './IdolBeliefSection';
import GothamSection from './GothamSection';
import PlatformsSection from './PlatformsSection';
import TrustSection from './TrustSection';
import PortfolioGridSection from './PortfolioGridSection';
import ManifestoSection from './ManifestoSection';
import CertificationsSection from './CertificationsSection';
import BAKESection from './BAKESection';
import ProcessSection from './ProcessSection';
import FinalCTASection from './FinalCTASection';
import Footer from './Footer';

const NewHome: React.FC = () => {
  return (
    <div className="relative bg-black">
      <CinematicHero />
      <GuaranteeStrip />
      <IdolSection />
      <IdolBeliefSection />
      <GothamSection />
      <PlatformsSection />
      <TrustSection />
      <PortfolioGridSection />
      <ManifestoSection />
      <CertificationsSection />
      <BAKESection />
      <ProcessSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default NewHome;
