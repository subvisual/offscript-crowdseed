/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=61c33c9858a987caf6602ade").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
]

let Controller

class NotFoundView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/NotFoundController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = NotFoundView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '61c33c9858a9876a73602ae0'
    htmlEl.dataset['wfSite'] = '61c33c9858a987caf6602ade'

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }

  render() {
    const proxies = NotFoundView.Controller !== NotFoundView ? transformProxies(this.props.children) : {

    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/subvisual-holidays.webflow.css);


          * {
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              -moz-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              -moz-font-feature-settings: \"smcp=1, onum=1, frac=1, kern=1, liga=1, dlig=1, swsh=1\";
              -ms-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              -o-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              -webkit-font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              font-feature-settings: \"smcp\" 1, \"onum\" 1, \"frac\" 1, \"kern\" 1, \"liga\" 1, \"dlig\" 1, \"swsh\" 1;
              font-feature-settings: normal;
            }
          .navbar-background{
          	backdrop-filter: blur(20px);
          }
          .load-background {
          animation: colorBackgroundMove 1.5s cubic-bezier(0.22, 1, 0.36, 1);
          animation-delay: 0.8s;
          animation-fill-mode: forwards;
          } 
          @keyframes colorBackgroundMove {
          	0% {
          		width: 100vw;
          		height: 100vh;
          		margin-left: 0px auto;
                	border-radius: 0 0 0 0;
          	}
          	100% {
          		width: 97vw;
                	height: 97vh;
          		margin: 0px 1.5%;
                	border-radius: 0 0 60px 60px;
          	}
            }
          .w-webflow-badge{
          	display: none !important;
          }
        ` }} />
        <span className="af-view">
          <div>
            <div className="load-background _404">
              <h2 style={{opacity: 0}} className="load-heading">ooooops! 😬</h2>
            </div>
            <div className="overlays">
              <div className="overlay services" />
              <div className="overlay ventures" />
              <div className="overlay people" />
              <div className="overlay home" />
            </div>
            <div data-animation="over-right" className="navbar-2 nav-bar w-nav" data-easing2="ease-out-quint" data-easing="ease-out-quint" data-collapse="medium" data-w-id="22c507d2-81aa-fb41-e277-2746202e7921" role="banner" data-no-scroll={1} data-duration={700} id="navbar" data-doc-height={1}>
              <div id="navbar-background" data-w-id="c471534b-f3a3-dbd4-ad6e-0d5632ddbe71" className="navbar-background" />
              <div className="container nav-bar">
                <a href="index.html" className="nav-brand transition t-home w-nav-brand">
                  <div className="logo-box nav-bar"><img src="images/logo-white.svg" loading="lazy" data-w-id="22c507d2-81aa-fb41-e277-2746202e7925" alt="home link - subvisual logo" className="main-logo white-logo" /><img src="images/symbol-dark.svg" loading="lazy" data-w-id="368d4ba8-be94-e03f-58b9-5c2ff86a2ac7" alt="home link - subvisual logo" className="main-logo dim-grey-logo" /><img src="images/symbol-white.svg" loading="lazy" alt="home link - subvisual logo" className="main-logo white-symbol" /></div>
                </a>
              </div>
              <div className="overlay services" />
              <div className="overlay ventures" />
              <div className="overlay people" />
              <div className="overlay home" />
            </div>
            <div className="section hero hide wf-section">
              <div className="video-container flex-center _404"><img src="images/404-background2x.png" loading="lazy" data-w-id="2b5daf73-3a45-9939-7f54-2f96727c5954" height={452} srcSet="images/404-background2x-p-500.png 500w, images/404-background2x-p-800.png 800w, images/404-background2x-p-1080.png 1080w, images/404-background2x-p-1600.png 1600w, images/404-background2x-p-2000.png 2000w, images/404-background2x.png 2880w" sizes="100vw" alt className="hero-image-two" /></div>
              <div style={{WebkitTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0}} className="first-container">
                <div className="hero-container">
                  <div>
                    <h1>Ooops!</h1>
                    <div className="margin-top-28">
                      <h2 className="color-white">Took the wrong turn.<br />What are you looking for?<br /></h2>
                    </div>
                    <div className="flex-left">
                      <div className="margin-top-56">
                        <div className="margin-right-28">
                          <a href="#" className="button color-white w-button">LET's talk</a>
                        </div>
                      </div>
                      <div className="margin-top-56">
                        <a href="index.html" className="button color-white w-button">take me home</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-w-id="02fa3be4-94b6-f5f0-94cc-2abf7a8f8da9" className="section hero wf-section">
              <div className="video-container flex-center _404"><img src="images/404-background2x.png" loading="lazy" sizes="100vw" height={800} srcSet="images/404-background2x-p-500.png 500w, images/404-background2x-p-800.png 800w, images/404-background2x-p-1080.png 1080w, images/404-background2x-p-1600.png 1600w, images/404-background2x-p-2000.png 2000w, images/404-background2x.png 2880w" alt className="hero-image-two" /></div>
              <div style={{WebkitTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0}} className="first-container">
                <div className="hero-container">
                  <div>
                    <h1>Ooops!</h1>
                    <div className="margin-top-28">
                      <h2 className="color-white">Took the wrong turn.<br />What are you looking for?<br /></h2>
                    </div>
                    <div className="margin-top-56">
                      <a href="index.html" className="button color-white w-button">take me home</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section footer wf-section">
              <div className="container">
                <div className="columns-grid-2">
                  <div className="column-1" />
                  <div className="column-2">
                    <h1 className="alternative">Happy Holidays 💙</h1>
                  </div>
                </div>
                <div className="margin-top-84">
                  <div className="columns-grid-2">
                    <div className="column-1">
                      <h5 className="color-royal-blue">The footer</h5>
                      <div className="margin-top-20">
                        <p>It's where the website ends. Yap.</p>
                      </div>
                    </div>
                    <div className="column-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal" />
            <div className="reveal-no-move" />
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default NotFoundView

/* eslint-enable */