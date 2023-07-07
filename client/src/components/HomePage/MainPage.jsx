import React from 'react'
import LandingPage from './HomePageComponents/LandingPage'
import FeaturesPage from './HomePageComponents/FeaturesPage'
import WorkWithMePage from './HomePageComponents/WorkWithMePage'
import CategoriesPage from './HomePageComponents/CategoriesPage'
import LiveCounterPage from './HomePageComponents/LiveCounterPage'
import AdvertisePage from './HomePageComponents/AdvertisePage'
import ContactMePage from './HomePageComponents/ContactMePage'
import FooterPage from './HomePageComponents/FooterPage'

const MainPage = () => {
  return (
    <>
        <LandingPage/>
        <FeaturesPage/>
        <WorkWithMePage/>
        <CategoriesPage/>
        <LiveCounterPage/>
        <AdvertisePage/>
        <ContactMePage/>
        <FooterPage/>
    </>
  )
}

export default MainPage