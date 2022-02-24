/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionTicketsView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionTicketsController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionTicketsView

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
    const proxies = SectionTicketsView.Controller !== SectionTicketsView ? transformProxies(this.props.children) : {
      'sock-tickets': [],
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
          <div id="tickets" className="section is--20padding hide wf-section">
            <div className="overflow_hidden">
              <div className="marquee-wrapper is--1">
                <div className="heading--154 is--marquee">Eclectic+creative+web3+</div>
                <div className="heading--154 is--marquee">Eclectic+creative+web3+</div>
                <div className="heading--154 is--marquee">Eclectic+creative+web3+</div>
                <div className="heading--154 is--marquee">Eclectic+creative+web3+</div>
              </div>
            </div>
            <div className="overflow_hidden">
              <div className="marquee-wrapper is--second">
                <div className="marquee-row-right">
                  <div className="heading--154 is--marquee">anything you want it to be&nbsp;</div>
                  <div className="heading--154 is--marquee">anything you want it to be&nbsp;</div>
                </div>
                <div className="marquee-row-right">
                  <div className="heading--154 is--marquee">anything you want it to be&nbsp;</div>
                  <div className="heading--154 is--marquee">anything you want it to be&nbsp;</div>
                </div>
              </div>
            </div>
            <div className="div-block-2">
              <div className="overflow_hidden">
                <div className="getticket-background">
                  {map(proxies['sock-tickets'], props => <a data-w-id="fbf2cd08-3062-3092-8552-ca713eeafab8" href="#" {...{...props, className: `getticket-btn w-inline-block ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                    <div className="overflow_hidden">
                      <div className="hover-text-wrapper animation-fadein">
                        <div className="text_hover">HOMEPAGE</div>
                        <div className="text_hover">HOMEPAGE</div>
                      </div>
                    </div>
                  </React.Fragment>}</a>)}
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default SectionTicketsView

/* eslint-enable */