/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class AfGridView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/AfGridController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = AfGridView

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
    const proxies = AfGridView.Controller !== AfGridView ? transformProxies(this.props.children) : {

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
          <div className="margin-top-40">
            <div>[React grid goes in here - Do not remove this section]</div>
            <div className="img-holder hide"><img src="images/background-tiles.png" loading="lazy" srcSet="images/background-tiles-p-500.png 500w, images/background-tiles.png 1501w" sizes="100vw" alt="A beautiful background made of tiles" className="img" /></div>
            <div className="dropshadow-test" />
          </div>
        </span>
      </span>
    )
  }
}

export default AfGridView

/* eslint-enable */