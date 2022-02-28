/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionActionsView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionActionsController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionActionsView

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
    const proxies = SectionActionsView.Controller !== SectionActionsView ? transformProxies(this.props.children) : {
      'sock-mint': [],
      'sock-buy': [],
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
              <div className="af-class-grid-2 af-class-_3">
                <div id="w-node-f47c5bc1-f7de-390b-acb6-4b2a5184bb43-6fc6f102" className="af-class-left">
                  <div className="af-class-overflow_hidden">
                    <div className="af-class-heading--137 af-class-_24margin-bottom">MINT<br />NFT</div>
                  </div>
                  <div className="af-class-text--20">
                    <a href="https://mirror.xyz/0x8C4F71B3cF6a76dE2CC239a6fA84E1a80e589598/Tya8b-rNzMWGQfOZZzpsV8BKnb8ZKbXIyZB9F8eVXgc" target="_blank">More info here</a><br />
                  </div>
                  <div className="af-class-_60margin-top af-class-_20-tablet">
                    <div className="af-class-overflow_hidden">
                      <div className="af-class-getticket-background af-class-small">
                        {map(proxies['sock-mint'], props => <a href="#" {...{...props, className: `af-class-getticket-btn-2 af-class-_100 w-inline-block ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                          <div className="af-class-overflow_hidden">
                            <div className="af-class-hover-text-wrapper af-class-small af-class-animation-fadein">
                              <div className="af-class-text_hover">MINT NFT</div>
                              <div className="af-class-text_hover">connect wallet</div>
                            </div>
                          </div>
                        </React.Fragment>}</a>)}
                      </div>
                    </div>
                  </div>
                </div>
                <div id="w-node-_29c4b12b-f731-a3db-f4f3-78a9dfa15342-6fc6f102" className="af-class-vertical-line" />
                <div id="w-node-_2f6973b9-da25-590c-01d6-262cb193adf4-6fc6f102" className="af-class-right">
                  <div className="af-class-overflow_hidden">
                    <div className="af-class-heading--137 af-class-_24margin-bottom af-class-_40-top-landscape">BUY <br />TICKET</div>
                    <div className="af-class-text--20">
                      <a href="https://mirror.xyz/0x8C4F71B3cF6a76dE2CC239a6fA84E1a80e589598/Tya8b-rNzMWGQfOZZzpsV8BKnb8ZKbXIyZB9F8eVXgc" target="_blank">More info here</a><br />
                    </div>
                    <div className="af-class-_60margin-top af-class-_20-tablet">
                      <div className="af-class-overflow_hidden">
                        <div className="af-class-getticket-background af-class-small">
                          {map(proxies['sock-buy'], props => <a href="#" {...{...props, className: `af-class-getticket-btn-2 af-class-_100 w-inline-block ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                            <div className="af-class-overflow_hidden">
                              <div className="af-class-hover-text-wrapper af-class-small af-class-animation-fadein">
                                <div className="af-class-text_hover">BUY TICKET</div>
                                <div className="af-class-text_hover">connect wallet</div>
                              </div>
                            </div>
                          </React.Fragment>}</a>)}
                        </div>
                      </div>
                    </div>
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

export default SectionActionsView

/* eslint-enable */