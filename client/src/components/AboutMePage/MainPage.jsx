import LandingPage from "./AboutMeComponents/LandingPage";
import MySkillsPage from "./AboutMeComponents/MySkillsPage";
import MainNavBar from "../HelperPages/Navbar/MainNavbar"

export default function Example() {

    return (
      <>
          <div className="bg-white">
          <div className="relative isolate px-6 lg:px-8">

            <MainNavBar/>
            <div className="mx-auto">
              <LandingPage/>
              <MySkillsPage/>
            </div>

          </div>
          </div>
      </> 
    )
  }