/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import AfActionsView from './AfActionsView'
import AfGridView from './AfGridView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=61c33c9858a987caf6602ade").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '61c33c9858a987cfe6602adf'
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
    const proxies = IndexView.Controller !== IndexView ? transformProxies(this.props.children) : {

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
            <div style={{display: 'flex', opacity: 1}} className="load-background">
              <h2 style={{opacity: 0}} className="load-heading">Probably the best gift you will get this year</h2>
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
                <a href="index.html" aria-current="page" className="nav-brand transition t-home w-nav-brand w--current">
                  <div className="logo-box nav-bar"><img src="images/logo-white.svg" loading="lazy" data-w-id="22c507d2-81aa-fb41-e277-2746202e7925" alt="home link - subvisual logo" className="main-logo white-logo" /><img src="images/symbol-dark.svg" loading="lazy" data-w-id="368d4ba8-be94-e03f-58b9-5c2ff86a2ac7" alt="home link - subvisual logo" className="main-logo dim-grey-logo" /><img src="images/symbol-white.svg" loading="lazy" alt="home link - subvisual logo" className="main-logo white-symbol" /></div>
                </a>
              </div>
              <div className="overlay services" />
              <div className="overlay ventures" />
              <div className="overlay people" />
              <div className="overlay home" />
            </div>
            <div data-w-id="5b791318-b617-e57f-9221-88db8217b68e" className="section hero wf-section">
              <div className="video-container edge"><img src="images/background.png" loading="lazy" sizes="(max-width: 991px) 100vw, 97vw" height={452} alt="background" srcSet="images/background-p-500.png 500w, images/background-p-800.png 800w, images/background-p-1080.png 1080w, images/background.png 2000w" className="hero-image edge" /></div>
              <div className="first-container hero">
                <div className="hero-container">
                  <h1 data-w-id="56db997e-04bc-2ac5-cb21-fbbf060aa002">Our universe without u, is kinda niverse 😟</h1>
                </div>
              </div>
              <div className="second-container hero">
                <div className="hero-container stop-phone"><img src="images/Subvisual_arrow.svg" loading="lazy" style={{opacity: 0}} alt="arrow" className="hero-arrow" />
                  <div style={{WebkitTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, -28px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', opacity: 0}} className="margin-left-40 switch-top-phone">
                    <p className="color-white">There's more if you scroll a little.</p>
                  </div>
                </div>
              </div>
            </div>
            <AfActionsView.Controller />
            <div data-w-id="af83e6be-7ee1-7e00-8f28-f94b864a679b" className="section no-padding-down wf-section">
              <div className="container">
                <h2 className="reveal">What you did up there ⬆️, is showing up down here ⬇️<span className="alternative" /></h2>
                <div className="margin-top-40">
                  <p className="reveal max-width-442">Where could it be? 🤓<br /></p>
                </div>
              </div>
              <div className="container nfts hide">
                <div className="margin-top-40">
                  <div className="img-holder"><img src="images/background-tiles.png" loading="lazy" srcSet="images/background-tiles-p-500.png 500w, images/background-tiles.png 1501w" sizes="100vw" alt="A beautiful background made of tiles" className="img" /></div>
                </div>
              </div>
            </div>
            <div id="react-root" className="section no-padding-up wf-section">
              <div className="container nfts">
                <AfGridView.Controller />
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
            <div data-w-id="7a41a91f-44b1-a3d3-4655-747c7af1861b" className="reveal" />
            <div className="reveal-no-move" />
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */