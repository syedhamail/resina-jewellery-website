import React from 'react';
import Header from './components/header';
import HeroSection from './components/hero-section';
import TrendingSection from './components/Trending-Section';
import NewArrivals from './components/New-Arrivals';
import ContactUs from './components/contactus';
import Footer from './components/footer';

export default function Home() {
  return (
    <main className='bg-[#FAF3EB]'>
      
      <div>
        <Header />
      </div>

      {/*Hero Section*/}
      <div>
        <HeroSection />
      </div>

      {/*Trending Section*/}
      <TrendingSection/>

      {/*New Arrivals Section*/}
      <NewArrivals/>

      {/*Contact Us Section*/}
      <ContactUs />

      {/*Footer Section*/}
      <Footer />
      
    </main>
  );
}
