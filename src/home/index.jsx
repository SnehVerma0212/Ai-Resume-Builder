import Header from '@/components/ui/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Marquee from "react-fast-marquee";
import './home.css'

function Accordion() {
  return (
    <div>
      Accordion
    </div>
  )
}
function Hero() {
  return (
      <div className="hero padding flex-v">
          <div className="flex-v gap-sm">
          <p className="title">Build Your Resume <span className='color'>With AI</span></p>
          <p className="">Easily create the perfect resume for any job using our best-in-class resume builder platform.</p>
          </div>
          <div className="hero__buttons gap">
              {/* <Link to={'/auth/sign-in'}><button className='cta__button'>Create my Resume now</button></Link> */}
              <Link to={'/dashboard'}><button className='cta__button'>Create my Resume now</button></Link>
              <button className='outlined'>Import Resume</button>
          </div>
          <div className='marquee flex-v gap'>
              <p className="bold">Subscribers have been hired by:</p>
              <Marquee>
                  <p className='marquee__element'>Amazon</p>
                  <p className='marquee__element'>Goldman Sachs</p>
                  <p className='marquee__element'>Google</p>
                  <p className='marquee__element'>TCS</p>
                  <p className='marquee__element'>Infosys</p>
              </Marquee>
          </div>
          <p>Our online resume builder offers a quick and easy way to create your professional resume from 25+ design templates. Create a resume using our AI resume builder feature, plus take advantage of expert suggestions and customizable modern and professional resume templates. Free users have access to our easy-to-use tool and TXT file downloads.</p>
      </div>
  )
}

function Home() {
  return (
    <div>
      <Header/>
      <div className='home__section__container'>
        <div className="home__section"></div>
        <Hero />
      </div>
    </div>
  )
}

export default Home
