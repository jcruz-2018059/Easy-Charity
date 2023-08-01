import React from "react";
import { Link } from "react-router-dom";
import "../HomePage/HomePage.css";

export const HomePage = () => {
  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
      </style>
      <header
        className="masthead"
        style={{ paddingTop: "6.5rem", backgroundColor: "#B82727" }}
      >
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 className="display-1 lh-1 mb-3" id="hero-title">
                  Conectando Corazones
                </h1>
                <p className="lead fw-normal mb-5" id="hero-text">
                Aquellos que son más felices, son los que hacen más por los demás
                </p>
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  <Link
                  to='/login'
                    type="button"
                    className="btn btn-danger btn-lg px-4 me-md-2 rounded-0"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                  to='/register'
                    type="button"
                    className="btn btn-outline-light btn-lg px-4 me-md-2 rounded-0"
                  >
                    Registrate
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="masthead-device-mockup">
                <div className="device-wrapper">
                  <div
                    className="device"
                    data-device="iPhoneX"
                    data-orientation="portrait"
                    data-color="black"
                  >
                    <div className="">
                      <img
                        className="img-fluid"
                        src="\src\assets\HeroImage.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div
          className=""
          style={{
            backgroundColor: "#F4F4F4",
            paddingTop: "4.5rem",
            paddingBottom: "2.5rem",
          }}
        >
          <div className="container px-5">
            <div
              className="card mb-3 mx-auto border border-light"
              style={{ maxWidth: "840px" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="\src\assets\ImageSection.jpg"
                    className="img-fluid rounded-0"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body p-5">
                    <h5 className="card-title" id="card-title">
                      ¿Qué es?
                    </h5>
                    <h5 className="card-title" id="card-title2">
                      Easy Charity
                    </h5>
                    <p className="card-text">
                      Easy Charity es una aplicación web que tiene como objetivo
                      colaborar con organizaciones caritativas y de ayuda
                      social.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="px-4 py-5  text-center"
          style={{ paddingTop: "6.5rem", backgroundColor: "#F4F4F4" }}
        >
          <h1 className="display-5" id="text-section1">
            + 1,OOO,OOO
          </h1>
          <p className="fw-bold" id="text-section2">
            De personas beneficiadas
          </p>
          <div className="col-lg-6 mx-auto">
            <p className="card-text text-justify" id="text-section3">
              La aplicación permitirá a las organizaciones benéficas crear
              anuncios con iniciativas, proyectos y necesidades de
              financiamiento,también podrán reclutar voluntarios para obras
              sociales pormedio de formularios de solicitud, esto les permitirá
              a los colaboradores poner sus habilidades y conocimientos al
              servicio de los demás.
            </p>
            <div className="pt-2 d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
              to='/login'
                type="button"
                className="btn btn-danger rounded-0 btn-lg px-4 gap-3"
              >
                Comenzar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-center py-5">
        <div className="container px-5">
          <div className="text-white-50 small ">
            <div className="mb-2">
              © Easy Charity 2023. All Rights Reserved.
            </div>
            <p href="#!">Privacy . Terms . FAQ</p>
          </div>
        </div>
      </footer>
    </>
  );
};
