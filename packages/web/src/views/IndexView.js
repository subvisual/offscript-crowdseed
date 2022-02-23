/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import SectionConnectView from './SectionConnectView'
import SectionWalletView from './SectionWalletView'
import SectionMintView from './SectionMintView'
import SectionMintedView from './SectionMintedView'
import SectionTicketsView from './SectionTicketsView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6215154fc24aa10549c6f101").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
  { loading: Promise.resolve("const html=document.querySelector(\"html\"),madeBy=document.createComment(\"MADE BY ONDASTUDIO.CO\");document.insertBefore(madeBy,html);"), isAsync: false },
  { loading: Promise.resolve("
   /*     
  if (screen.width>992){
  document.write(\"<script src=\'https://mzrt2z.csb.app/script.js\'></scr\"+\"ipt>\");
  };
  if (screen.width<992){
  document.write(\"<script src=\'https://mzrt2z.csb.app/script-mobile.js\'></scr\"+\"ipt>\");
  };
  */
  "), isAsync: false },
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
    htmlEl.dataset['wfPage'] = '6215154fc24aa1b66fc6f102'
    htmlEl.dataset['wfSite'] = '6215154fc24aa10549c6f101'

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
          @import url(/css/offscript-website-325e235569d243ef7486b.webflow.css);


          * {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          }
        ` }} />
        <span className="af-view">
          <div>
            <div className="af-class-body">
              <div className="w-embed">
                <style dangerouslySetInnerHTML={{__html: "\n.af-view .af-class-graph-rotating {\n  white-space: nowrap;\n  will-change: transform;\n  animation: graph-rotating 20s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes graph-rotating {\n  .af-view from {\n    transform: rotate(0deg);\n  }\n  .af-view to {\n    transform: rotate(359deg);\n  }\n}\n.af-view .af-class-is--first-img{\n  white-space: nowrap;\n  will-change: transform;\n  animation: is--first-img 20s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes is--first-img {\n  .af-view from {\n    transform: rotate(0deg);\n  }\n  .af-view to {\n    transform: rotate(-359deg);\n  }\n}\n.af-view .af-class-marquee-row-logos {\n  white-space: nowrap;\n  will-change: transform;\n  animation: marquee-row-logos 35s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes marquee-row-logos {\n  .af-view from {\n    transform: translate(0%, 0px);\n  }\n  .af-view to {\n    transform: translate(-100%, 0px);\n  }\n}\n.af-view .af-class-rotating-glob {\n  white-space: nowrap;\n  will-change: transform;\n  animation: rotating-glob 5s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes rotating-glob {\n  .af-view from {\n    transform: rotatey(0deg);\n  }\n  .af-view to {\n    transform: rotatey(359deg);\n  }\n}\n.af-view * {\ntext-rendering: optimizeLegibility;\n-webkit-font-smoothing: antialiased;\nfont-smoothing: antialiased;\n-moz-osx-font-smoothing: grayscale;\n}\n.af-view .af-class-_1440container.af-class-is--explore {\n  pointer-events: none;\n}\n.af-view .af-class-explore-img {\n  pointer-events: none;\n}\n.af-view {\n  overflow-x: hidden;\n}\n.af-view .af-class-map-link {\n  pointer-events: auto !important;\n}\n@media only screen and (max-width: 1919px) and (min-width: 1442px) {\n  .af-view {\n    font-size: 0.06vw;\n  }\n}\n" }} />
              </div>
              <div className="af-class-navbar_parent af-class-wf-section">
                <div className="af-class-navbar_grid">
                  <a href="https://www.web3creatives.com/" className="af-class-brand_link w-inline-block"><img src="images/OffScript-Logo-2.png" loading="lazy" sizes="(max-width: 479px) 56vw, (max-width: 767px) 44vw, (max-width: 991px) 27vw, (max-width: 1919px) 15vw, 11vw" srcSet="images/OffScript-Logo-2-p-500.png 500w, images/OffScript-Logo-2-p-800.png 800w, images/OffScript-Logo-2-p-1080.png 1080w, images/OffScript-Logo-2.png 2708w" alt="Offscript logo" className="af-class-brand_img" /></a>
                </div>
              </div>
              <div className="af-class-section af-class-is--100padding af-class-wf-section">
                <div className="af-class-_1077_container">
                  <div className="af-class-overflow_hidden">
                    <div className="af-class-heading--137 af-class-_24margin-bottom">WELCOME TO THE CROWDSEED</div>
                    <div className="af-class-faq--question-title">With the Offscript NFT Crowdseed you can:<br /></div>
                    <div className="af-class-text--20">- Show your support for, and interest in Offscript<br />- Buy a beautiful art work by @tasty_plots<br />- Get a discount of 10%, 25%, 40% or 100%<br /><br />Connect your wallet to Buy and Mint an NFT</div>
                  </div>
                </div>
              </div>
              <SectionConnectView.Controller />
              <SectionWalletView.Controller />
              <SectionMintView.Controller />
              <SectionMintView.Controllered />
              <SectionTicketsView.Controller />
              <div className="af-class-section af-class-is--footer af-class-wf-section">
                <div className="af-class-_1360_container af-class-is--20padding-tablet">
                  <div className="af-class-_200-spacing" />
                  <div className="af-class-overflow_hidden">
                    <a href="https://www.web3creatives.com/" className="af-class-brand_link w-inline-block"><img src="images/OffScript-Logo-2.png" loading="lazy" sizes="(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 95vw, (max-width: 1919px) 94vw, (max-width: 3814px) 71vw, 2708px" srcSet="images/OffScript-Logo-2-p-500.png 500w, images/OffScript-Logo-2-p-800.png 800w, images/OffScript-Logo-2-p-1080.png 1080w, images/OffScript-Logo-2.png 2708w" alt="Offscript logo" className="af-class-footer_logo af-class-animation-fadein" /></a>
                  </div>
                </div>
                <div className="af-class-line" />
                <div className="af-class-_1360_container af-class-is--footer">
                  <div className="w-layout-grid af-class-grid--footer af-class-is--crendentials">
                    <div id="w-node-a09e21ea-20ba-9d3e-69cf-fead278e4391-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-font-gradient-3 af-class-animation-fadein">© Offscript 2022</div>
                    </div>
                    <div id="w-node-_2dccd64b-e470-8fbb-93cd-30bb53cb9e49-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-is--50opacity af-class-animation-fadein">
                        <a href="https://www.iubenda.com/privacy-policy/85578480" rel="noopener" aria-label="Privacy Policy" target="_blank" className="af-class-credentialslink">Privacy Policy</a>
                      </div>
                    </div>
                    <div id="w-node-c73cba14-1723-949f-1ab3-2bdf72efdb80-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-animation-fadein">Made by <a href="https://www.ondastudio.co/" rel="noopener" aria-label="Onda's website" target="_blank" className="af-class-credentialslink">Onda</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="af-class-map-popup af-class-tickets">
                <div className="af-class-map-wrapper af-class-tickets">
                  <div className="af-class-map-close-wrapper af-class-tickets">
                    <div data-w-id="6eb0cf48-6b60-fd6f-177b-846434655d77" className="af-class-close-btn">
                      <div className="af-class-text--20">Close</div><img src="images/close.svg" loading="lazy" alt="Close icon" className="af-class-close_icon" />
                    </div>
                  </div>
                  <div className="af-class-tickets-actions-wrapper-2">
                    <div className="af-class-overflow_hidden">
                      <div className="af-class-align-center">
                        <div className="af-class-heading--56 af-class-animation-fadein">Get Tickets</div>
                      </div>
                    </div>
                    <div className="af-class-_16margin-top">
                      <div className="af-class-overflow_hidden">
                        <div className="af-class-align-center">
                          <div className="af-class-text--20 af-class-animation-fadein">Connect (Ethereum) wallet to check for discounts and buy with crypto (ETH, DAI, USDC, USDT) or Buy with fiat to use Paypal or Creditcard.</div>
                        </div>
                      </div>
                    </div>
                    <div className="af-class-_60margin-top">
                      <div className="af-class-grid-2">
                        <div className="af-class-overflow_hidden">
                          <div className="af-class-getticket-background af-class-small af-class-animation-fadein">
                            <a href="#" className="af-class-getticket-btn-2 af-class-_100 w-inline-block">
                              <div className="af-class-overflow_hidden">
                                <div className="af-class-hover-text-wrapper af-class-small af-class-animation-fadein">
                                  <div className="af-class-text_hover">connect wallet</div>
                                  <div className="af-class-text_hover">connect wallet</div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="af-class-overflow_hidden">
                          <div className="af-class-getticket-background af-class-small af-class-animation-fadein">
                            <a href="https://ti.to/offscript/offscript" target="_blank" className="af-class-getticket-btn-2 af-class-_100 w-inline-block">
                              <div className="af-class-overflow_hidden">
                                <div className="af-class-hover-text-wrapper af-class-small af-class-animation-fadein">
                                  <div className="af-class-text_hover">BUY WITH FIAT</div>
                                  <div className="af-class-text_hover">BUY WITH FIAT</div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */