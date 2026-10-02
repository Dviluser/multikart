import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="sticky-footer darken-background">
        <section className="section-b-space darken-layout">
          <div className="container">
            <div className="row footer-theme partition-f">

              {/* ABOUT */}
              <div className="col-lg-4 col-md-6">
                <div className="footer-title footer-mobile-title">
                  <h4>about</h4>
                </div>

                <div className="footer-content">
                  <a href="/" className="footer-logo d-block">
                    <img src="/assets/images/yoga/logo-white.png" alt="" style={{height:"55px",width:"auto"}} />
                  </a>

                  <p>
                    Discover the latest fashion trends, explore unique styles,
                    and enjoy seamless shopping with our carefully curated collections.
                  </p>

                  <div className="footer-social">
                    <ul>
                      <li><a href="https://www.facebook.com/"><i className="ri-facebook-fill"></i></a></li>
                      <li><a href="https://www.google.com/"><i className="ri-google-fill"></i></a></li>
                      <li><a href="https://www.twitter.com/"><i className="ri-twitter-x-fill"></i></a></li>
                      <li><a href="https://www.instagram.com/"><i className="ri-instagram-fill"></i></a></li>
                      <li><a href="https://www.tiktok.com/"><i className="ri-tiktok-fill"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ACCOUNT */}
              <div className="col offset-xl-1">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>my account</h4>
                  </div>

                  <div className="footer-content">
                    <ul>
                      <li><a href="#!">mens</a></li>
                      <li><a href="#!">womens</a></li>
                      <li><a href="#!">clothing</a></li>
                      <li><a href="#!">accessories</a></li>
                      <li><a href="#!">featured</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* WHY CHOOSE */}
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>why we choose</h4>
                  </div>

                  <div className="footer-content">
                    <ul>
                      <li><a href="#!">shipping & return</a></li>
                      <li><a href="#!">secure shopping</a></li>
                      <li><a href="#!">gallery</a></li>
                      <li><a href="#!">affiliates</a></li>
                      <li><a href="#!">contacts</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* STORE INFO */}
              <div className="col">
                <div className="sub-title">
                  <div className="footer-title">
                    <h4>store information</h4>
                  </div>

                  <div className="footer-content">
                    <ul className="contact-list">
                      <li><i className="ri-map-pin-2-fill"></i> Multikart Demo Store, India</li>
                      <li><i className="ri-phone-fill"></i> Call Us: 123-456-7898</li>
                      <li><i className="ri-mail-fill"></i> Email: Support@Multikart.com</li>
                      <li><i className="ri-printer-fill"></i> Fax: 123456</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SUB FOOTER */}
        <div className="sub-footer darker-subfooter">
          <div className="container">
            <div className="row">

              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="footer-end">
                  <p>© 2024-25 themeforest powered by pixelstrap</p>
                </div>
              </div>

              <div className="col-xl-6 col-md-6 col-sm-12">
                <div className="payment-card-bottom">
                  <img src="/assets/images/payment.png" className="img-fluid" alt="" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </footer>
    </div>
  )
}

export default Footer