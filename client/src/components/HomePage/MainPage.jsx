import React from 'react'
import LandingPage from './HomePageComponents/LandingPage'
import FeaturesPage from './HomePageComponents/FeaturesPage'
import CategoriesPage from './HomePageComponents/CategoriesPage'
import ContactMePage from './HomePageComponents/ContactMePage'
import FooterPage from './HomePageComponents/FooterPage'

const MainPage = () => {
  return (
    <>
        <LandingPage/>
        <FeaturesPage/>
        <CategoriesPage/>
        <ContactMePage/>
        <FooterPage/>
    </>
  )
}

export default MainPage