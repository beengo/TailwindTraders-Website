import React, { Component } from "react";

import { NamespacesConsumer } from "react-i18next";

import { ReactComponent as Freeshipping } from "../../../../assets/images/icon-freeshipping.svg";
import Herobg from "../../../../assets/images/herobg.jpg";

class Hero extends Component {
    constructor(props) {
        super(props);
        // this.bgImg = React.createRef();
    }

    componentDidMount() {
        // const img = new Image();
        // img.src = Herobg;
        // img.onload = () => {
        //     const imgContainer = this.bgImg.current;
        //     imgContainer.style.backgroundImage = `url('${img.src}')`;
        //     imgContainer.classList.add("u-fade-in");
        // };
    }

    render() {
        return (
            <NamespacesConsumer>
                {t => (
                    <div className="hero">
                        <div className="hero__banner">
                            <div className="hero__inner">
                                {/* <Freeshipping /> */}
                                <span className="hero__text  hero__text--strong">
                                    3000+资深设计师为您服务
                                </span>
                                <span className="hero__text">&#8226;</span>
                                <span className="hero__text hero__text--light">
                                    200,000 会员的选择
                                </span>
                            </div>
                        </div>
                        <div className="hero__image-wrapper">
                            <div className="mj-buttons">
                                <p>美家全新推出订阅和定制服务, 现在开始,立享优惠</p>
                                <a href="/Subscription.html">开始订阅</a>
                                <a href="/CustomService.html">优选定制</a>
                            </div>
                            <video src="/videos/main.mp4" autoPlay="true" preload="auto" loop="loop"></video>
                            {/* <div className="hero__image" ref={this.bgImg} /> */}
                        </div>
                    </div>
                )}
            </NamespacesConsumer>
        );
    }
}

export default Hero;
