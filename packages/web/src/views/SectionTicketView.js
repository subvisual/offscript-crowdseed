/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionTicketView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionTicketController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionTicketView

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
    const proxies = SectionTicketView.Controller !== SectionTicketView ? transformProxies(this.props.children) : {
      'sock-email': [],
      'sock-radio-1': [],
      'sock-price-1': [],
      'sock-radio-2': [],
      'sock-price-2': [],
      'sock-currency': [],
      'sock-buy-ticket': [],
      'sock-ticket-notice': [],
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
          <div className="section is--80padding wf-section">
            <div className="_1077_container">
              <div className="overflow_hidden">
                <div className="heading--137 _40margin-bottom-copy">CHECKOUT</div>
              </div>
              <div className="w-form">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form-2"><label htmlFor="Email-2" className="text--20">Email Address</label>{map(proxies['sock-email'], props => <input type="email" maxLength={256} name="Email" data-name="Email" placeholder="Your ticket is sent to this address" id="Email-2" required {...{...props, className: `text-field w-input ${props.className || ''}`}}>{props.children}</input>)}<label className="radio-button-field w-radio">
                    <div className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button w-radio-input" />{map(proxies['sock-radio-1'], props => <input type="radio" name="Offscript" id="Offscript---800" value="Offscript - 800" data-name="Offscript" style={{opacity: 0, position: 'absolute', zIndex: -1}} {...props}>{props.children}</input>)}<span className="text--20 _28 w-form-label" htmlFor="Offscript---800"> Offscript experience</span>
                  </label>
                  <div className="_28margin-left">
                    <div className="text--20">Arrival April 1st - {map(proxies['sock-price-1'], props => <span {...{...props, className: `price-regular ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>$800</React.Fragment>}</span>)}</div>
                    <div className="text--20 _12">Inc. VAT @23%</div>
                    <div className="text--20 _16">Includes event, transportation, lodging, food, drinks. <br /><span className="bold">2 nights</span>, Check in April 1st Check out April 3rd</div>
                  </div><label className="radio-button-field w-radio">
                    <div className="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button w-radio-input" />{map(proxies['sock-radio-2'], props => <input type="radio" name="Extended" id="Extended-Experience---950" value="Extended Experience - 950" data-name="Extended" style={{opacity: 0, position: 'absolute', zIndex: -1}} {...props}>{props.children}</input>)}<span className="text--20 _28 w-form-label" htmlFor="Extended-Experience---950">Extended Offscript experience</span>
                  </label>
                  <div className="_28margin-left _40">
                    <div className="text--20">Arrival March 31st - {map(proxies['sock-price-2'], props => <span {...props}>{props.children ? props.children : <React.Fragment>$950</React.Fragment>}</span>)}</div>
                    <div className="text--20 _12">Inc. VAT @23%</div>
                    <div className="text--20 _16">Includes event, transportation, lodging, food, drinks. This ticket includes a limited seat early check and dinner in on March 31st. </div>
                  </div><label htmlFor="field" className="text--20">Crypto Payment</label>{map(proxies['sock-currency'], props => <select id="field" name="field" data-name="Field" required {...{...props, className: `select-field w-select ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                    <option value>Select a currency</option>
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                    <option value="DAI">DAI</option>
                  </React.Fragment>}</select>)}{map(proxies['sock-buy-ticket'], props => <input type="submit" value="BUY TICKET" data-wait="Please wait..." {...{...props, className: `submit-button w-button ${props.className || ''}`}}>{props.children}</input>)}
                  {map(proxies['sock-ticket-notice'], props => <div {...{...props, className: `text--20 _16margin-top ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Waiting placeholder...</React.Fragment>}</div>)}
                </form>
                <div className="success-message w-form-done">
                  <div className="text--20">Thank you! Your submission has been received!</div>
                </div>
                <div className="error-message w-form-fail">
                  <div className="text--20">Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default SectionTicketView

/* eslint-enable */