import React, { Component } from "react";
import { Link } from "react-router-dom";

import { NamespacesConsumer, I18nextProvider } from "react-i18next";


class Designer extends Component {


    render() {
        return (
            <NamespacesConsumer>
                {t => (
                    <div className="detail">
                        <div className="detail__wrapper">
                            <h1>xxxxx</h1>
                            <div className="detail__image" />
                            <div className="detail__info">
                            </div>
                        </div>
                    </div>
                )}
            </NamespacesConsumer>
        );
    }
}

export default Designer;
