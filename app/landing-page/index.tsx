import PricingSection from './pricing-section';
import Hero from './hero';
import FeaturesSection from './features-section';
import Footer from './footer';

const LandingPage = () => {
  return (
    <div>
      <Hero/>
      <FeaturesSection />
      
      <PricingSection />
     
      <div className='rounded-2xl'>


      <Footer />
      </div>      
    </div>
  );
}

export default LandingPage;