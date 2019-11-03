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
                        <div className="hero__image-wrapper">
                            <div className="mj-buttons">
                                <p>3000+资深设计师 &nbsp;&nbsp; 200,2000会员共同选择</p>
                                <p>美家全新推出订阅和定制服务, 现在立享优惠</p>
                                <a href="/Subscription.html">开始订阅</a>
                                <a href="/CustomService.html">优选定制</a>
                            </div>
                            <video src="/videos/main.mp4" poster="/poster.jpg" autoPlay preload="auto" loop></video>
                            {/* <div className="hero__image" ref={this.bgImg} /> */}
                        </div>
                    </div>
                )}
            </NamespacesConsumer>
        );
    }
}

export default Hero;
