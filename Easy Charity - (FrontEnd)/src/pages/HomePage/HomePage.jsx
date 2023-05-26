import React from 'react'
import { Link } from 'react-router-dom'
import '../HomePage/HomePage.css'

export const HomePage = () => {
  
    return (
      <>
      <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
</style>
       <header className="masthead" style={{paddingTop: "7.5rem", backgroundColor: "#e63946"}}>
            <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <div className="col-lg-6">

                        <div className="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 className="display-1 lh-1 mb-3" id='hero-title'>Conectando Corazones</h1>
                            <p className="lead fw-normal mb-5" id='hero-text'>Launch your mobile app landing page faster with this free, open source theme from Start Bootstrap!</p>
                            <div className="d-flex flex-column flex-lg-row align-items-center">
                              <Link  type="button" className="btn btn-danger btn-lg px-4 me-md-2 rounded-0">Iniciar Sesión</Link>
                              <Link  type="button" className="btn btn-outline-light btn-lg px-4 me-md-2 rounded-0">Registrate</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">

                        <div className="masthead-device-mockup">
                          
                            <div className="device-wrapper">
                                <div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                                    <div className="">
                                      <img src="\src\assets\HeroImage.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
      </>
    )
  }