/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class AfActionsView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/AfActionsController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = AfActionsView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    /* View has no WebFlow data attributes */

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
    const proxies = AfActionsView.Controller !== AfActionsView ? transformProxies(this.props.children) : {
      'af-metamask-connect-btn': [],
      'af-metamask-connect-success': [],
      'af-mint-btn': [],
      'af-mint-success': [],
      'af-refresh-btn': [],
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
          <div data-w-id="203a3fe2-dd47-8144-357c-8264319fc900" className="section wf-section">
            <div className="container">
              <h2 data-w-id="e1152758-d9c0-c7ba-339a-5ef2086dd60c" className="reveal">Let's mark your presence in the universe, <span className="alternative">with blockchain</span>.</h2>
            </div>
            <div className="container">
              <div className="margin-top-40">
                <div className="background-alice-blue hide">
                  <div className="align-center">
                    <h5>Coming soon, feel the FOMO 🔥</h5>
                  </div>
                </div>
                <div className="align-center">
                  {map(proxies['af-metamask-connect-btn'], props => <a href="#" {...{...props, className: `button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Connect Metamask</React.Fragment>}</a>)}
                  {map(proxies['af-metamask-connect-success'], props => <h5 {...props}>{props.children ? props.children : <React.Fragment>✅ Metamask connected</React.Fragment>}</h5>)}
                </div>
                <div className="margin-top-40">
                  <div className="align-center">
                    {map(proxies['af-mint-btn'], props => <a href="#" {...{...props, className: `button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>MINT! 🚀</React.Fragment>}</a>)}
                    {map(proxies['af-mint-success'], props => <h5 {...props}>{props.children ? props.children : <React.Fragment>✅ Minted</React.Fragment>}</h5>)}
                  </div>
                </div>
                <div className="margin-top-40">
                  <div className="align-center">
                    {map(proxies['af-refresh-btn'], props => <a href="#" {...{...props, className: `button w-button ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>PLEASE REFRESH THE PAGE</React.Fragment>}</a>)}
                  </div>
                </div>
                <div className="margin-top-40">
                  <div className="align-center">
                    <h2>⬇️</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default AfActionsView

/* eslint-enable */