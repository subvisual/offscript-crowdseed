/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionMintSuccessView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionMintSuccessController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionMintSuccessView

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
    const proxies = SectionMintSuccessView.Controller !== SectionMintSuccessView ? transformProxies(this.props.children) : {
      'sock-mint-hash': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/offscript-website-325e235569d243ef7486b.webflow.css);


          * {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          }
        ` }} />
        <span className="af-view">
          <div className="af-class-section af-class-is--80padding af-class-wf-section">
            <div className="af-class-_1077_container">
              <div className="af-class-overflow_hidden">
                <div className="af-class-heading--137 af-class-_24margin-bottom af-class-animation-fadein">NFT MINTED</div>
              </div>
              {map(proxies['sock-mint-hash'], props => <a href="#" {...{...props, className: `w-inline-block ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                <div className="af-class-text--20">View on Etherscan</div>
              </React.Fragment>}</a>)}
              <div className="af-class-faq--question-title af-class-_16margin-top">Thank you! 💛</div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default SectionMintSuccessView

/* eslint-enable */