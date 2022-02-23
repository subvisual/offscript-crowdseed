/* eslint-disable */

import React from "react";
import { createScope, map, transformProxies } from "./helpers";
import SectionConnectView from "./SectionConnectView";
import SectionWalletView from "./SectionWalletView";
import SectionMintView from "./SectionMintView";
import SectionMintedView from "./SectionMintedView";
import SectionTicketsView from "./SectionTicketsView";

const scripts = [
  {
    loading: fetch(
      "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6215154fc24aa10549c6f101"
    ).then((body) => body.text()),
    isAsync: false,
  },
  {
    loading: fetch("js/webflow.js").then((body) => body.text()),
    isAsync: false,
  },
];

let Controller;

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller;

    try {
      Controller = require("../controllers/IndexController");
      Controller = Controller.default || Controller;

      return Controller;
    } catch (e) {
      if (e.code == "MODULE_NOT_FOUND") {
        Controller = IndexView;

        return Controller;
      }

      throw e;
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector("html");
    htmlEl.dataset["wfPage"] = "6215154fc24aa1b66fc6f102";
    htmlEl.dataset["wfSite"] = "6215154fc24aa10549c6f101";

    scripts.concat(null).reduce((active, next) =>
      Promise.resolve(active).then((active) => {
        const loading = active.loading.then((script) => {
          new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script);

          return next;
        });

        return active.isAsync ? next : loading;
      })
    );
  }

  render() {
    const proxies =
      IndexView.Controller !== IndexView
        ? transformProxies(this.props.children)
        : {};

    return (
      <span>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/offscript-website-325e235569d243ef7486b.webflow.css);


          * {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          }
        `,
          }}
        />
        <span className="af-view">
          <div>
            <div className="body">
              <div className="w-embed">
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      '\n.af-view .graph-rotating {\n  white-space: nowrap;\n  will-change: transform;\n  animation: graph-rotating 20s linear infinite;\n  /* manipulate the speed of the marquee by changing "40s" line above*/\n}\n@keyframes graph-rotating {\n  .af-view from {\n    transform: rotate(0deg);\n  }\n  .af-view to {\n    transform: rotate(359deg);\n  }\n}\n.af-view .is--first-img{\n  white-space: nowrap;\n  will-change: transform;\n  animation: is--first-img 20s linear infinite;\n  /* manipulate the speed of the marquee by changing "40s" line above*/\n}\n@keyframes is--first-img {\n  .af-view from {\n    transform: rotate(0deg);\n  }\n  .af-view to {\n    transform: rotate(-359deg);\n  }\n}\n.af-view .marquee-row-logos {\n  white-space: nowrap;\n  will-change: transform;\n  animation: marquee-row-logos 35s linear infinite;\n  /* manipulate the speed of the marquee by changing "40s" line above*/\n}\n@keyframes marquee-row-logos {\n  .af-view from {\n    transform: translate(0%, 0px);\n  }\n  .af-view to {\n    transform: translate(-100%, 0px);\n  }\n}\n.af-view .rotating-glob {\n  white-space: nowrap;\n  will-change: transform;\n  animation: rotating-glob 5s linear infinite;\n  /* manipulate the speed of the marquee by changing "40s" line above*/\n}\n@keyframes rotating-glob {\n  .af-view from {\n    transform: rotatey(0deg);\n  }\n  .af-view to {\n    transform: rotatey(359deg);\n  }\n}\n.af-view * {\ntext-rendering: optimizeLegibility;\n-webkit-font-smoothing: antialiased;\nfont-smoothing: antialiased;\n-moz-osx-font-smoothing: grayscale;\n}\n.af-view ._1440container.is--explore {\n  pointer-events: none;\n}\n.af-view .explore-img {\n  pointer-events: none;\n}\n.af-view {\n  overflow-x: hidden;\n}\n.af-view .map-link {\n  pointer-events: auto !important;\n}\n@media only screen and (max-width: 1919px) and (min-width: 1442px) {\n  .af-view {\n    font-size: 0.06vw;\n  }\n}\n',
                  }}
                />
              </div>
              <div className="navbar_parent wf-section">
                <div className="navbar_grid">
                  <a
                    href="https://www.web3creatives.com/"
                    className="brand_link w-inline-block"
                  >
                    <img
                      src="images/OffScript-Logo-2.png"
                      loading="lazy"
                      sizes="(max-width: 479px) 56vw, (max-width: 767px) 44vw, (max-width: 991px) 27vw, (max-width: 1919px) 15vw, 11vw"
                      srcSet="images/OffScript-Logo-2-p-500.png 500w, images/OffScript-Logo-2-p-800.png 800w, images/OffScript-Logo-2-p-1080.png 1080w, images/OffScript-Logo-2.png 2708w"
                      alt="Offscript logo"
                      className="brand_img"
                    />
                  </a>
                </div>
              </div>
              <div className="section is--100padding wf-section">
                <div className="_1077_container">
                  <div className="overflow_hidden">
                    <div className="heading--137 _24margin-bottom">
                      WELCOME TO THE CROWDSEED
                    </div>
                    <div className="faq--question-title">
                      With the Offscript NFT Crowdseed you can:
                      <br />
                    </div>
                    <div className="text--20">
                      - Show your support for, and interest in Offscript
                      <br />- Buy a beautiful art work by @tasty_plots
                      <br />- Get a discount of 10%, 25%, 40% or 100%
                      <br />
                      <br />
                      Connect your wallet to Buy and Mint an NFT
                    </div>
                  </div>
                </div>
              </div>
              <SectionConnectView.Controller />
              <SectionWalletView.Controller />
              <SectionMintView.Controller />
              <SectionMintedView.Controller />
              <SectionTicketsView.Controller />
              <div className="section is--footer wf-section">
                <div className="_1360_container is--20padding-tablet">
                  <div className="_200-spacing" />
                  <div className="overflow_hidden">
                    <a
                      href="https://www.web3creatives.com/"
                      className="brand_link w-inline-block"
                    >
                      <img
                        src="images/OffScript-Logo-2.png"
                        loading="lazy"
                        sizes="(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 95vw, (max-width: 1919px) 94vw, (max-width: 3814px) 71vw, 2708px"
                        srcSet="images/OffScript-Logo-2-p-500.png 500w, images/OffScript-Logo-2-p-800.png 800w, images/OffScript-Logo-2-p-1080.png 1080w, images/OffScript-Logo-2.png 2708w"
                        alt="Offscript logo"
                        className="footer_logo animation-fadein"
                      />
                    </a>
                  </div>
                </div>
                <div className="line" />
                <div className="_1360_container is--footer">
                  <div className="w-layout-grid grid--footer is--crendentials">
                    <div
                      id="w-node-a09e21ea-20ba-9d3e-69cf-fead278e4391-6fc6f102"
                      className="overflow_hidden"
                    >
                      <div className="text--20 font-gradient-3 animation-fadein">
                        © Offscript 2022
                      </div>
                    </div>
                    <div
                      id="w-node-_2dccd64b-e470-8fbb-93cd-30bb53cb9e49-6fc6f102"
                      className="overflow_hidden"
                    >
                      <div className="text--20 is--50opacity animation-fadein">
                        <a
                          href="https://www.iubenda.com/privacy-policy/85578480"
                          rel="noopener"
                          aria-label="Privacy Policy"
                          target="_blank"
                          className="credentialslink"
                        >
                          Privacy Policy
                        </a>
                      </div>
                    </div>
                    <div
                      id="w-node-c73cba14-1723-949f-1ab3-2bdf72efdb80-6fc6f102"
                      className="overflow_hidden"
                    >
                      <div className="text--20 animation-fadein">
                        Made by{" "}
                        <a
                          href="https://www.ondastudio.co/"
                          rel="noopener"
                          aria-label="Onda's website"
                          target="_blank"
                          className="credentialslink"
                        >
                          Onda
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="map-popup tickets">
                <div className="map-wrapper tickets">
                  <div className="map-close-wrapper tickets">
                    <div
                      data-w-id="6eb0cf48-6b60-fd6f-177b-846434655d77"
                      className="close-btn"
                    >
                      <div className="text--20">Close</div>
                      <img
                        src="images/close.svg"
                        loading="lazy"
                        alt="Close icon"
                        className="close_icon"
                      />
                    </div>
                  </div>
                  <div className="tickets-actions-wrapper-2">
                    <div className="overflow_hidden">
                      <div className="align-center">
                        <div className="heading--56 animation-fadein">
                          Get Tickets
                        </div>
                      </div>
                    </div>
                    <div className="_16margin-top">
                      <div className="overflow_hidden">
                        <div className="align-center">
                          <div className="text--20 animation-fadein">
                            Connect (Ethereum) wallet to check for discounts and
                            buy with crypto (ETH, DAI, USDC, USDT) or Buy with
                            fiat to use Paypal or Creditcard.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="_60margin-top">
                      <div className="grid-2">
                        <div className="overflow_hidden">
                          <div className="getticket-background small animation-fadein">
                            <a
                              href="#"
                              className="getticket-btn-2 _100 w-inline-block"
                            >
                              <div className="overflow_hidden">
                                <div className="hover-text-wrapper small animation-fadein">
                                  <div className="text_hover">
                                    connect wallet
                                  </div>
                                  <div className="text_hover">
                                    connect wallet
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="overflow_hidden">
                          <div className="getticket-background small animation-fadein">
                            <a
                              href="https://ti.to/offscript/offscript"
                              target="_blank"
                              className="getticket-btn-2 _100 w-inline-block"
                            >
                              <div className="overflow_hidden">
                                <div className="hover-text-wrapper small animation-fadein">
                                  <div className="text_hover">
                                    BUY WITH FIAT
                                  </div>
                                  <div className="text_hover">
                                    BUY WITH FIAT
                                  </div>
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
    );
  }
}

export default IndexView;

/* eslint-enable */
