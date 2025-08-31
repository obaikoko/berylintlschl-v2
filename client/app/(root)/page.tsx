import About from '@/components/shared/home-page/about';
import HeroSlider from '@/components/shared/home-page/hero-slider';
import NewUsers from '@/components/shared/home-page/new-user';
import Onboarding from '@/components/shared/home-page/onboarding';
import Services from '@/components/shared/home-page/services';
import ServicesCards from '@/components/shared/home-page/services-card';
import WhyChooseUs from '@/components/shared/home-page/why-choose-us';

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <NewUsers />
      <Services />
      <About />
      <WhyChooseUs />
      <ServicesCards />
      <Onboarding />
    </>
  );
};

export default HomePage;
