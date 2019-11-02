import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { animateScroll as scroll } from "react-scroll";
import { LoadingSpinner } from "../../shared";
import Alert from "react-s-alert";

import Designer from "./designer";
import { CartService, ProductService, UserService } from '../../services';

class DesignerContainer extends Component {

    render() {
        return (
            <Fragment>
                
                <Designer />
                
            </Fragment>
        );
    }
}

const mapStateToProps = state => state.login;

export default connect(mapStateToProps)(DesignerContainer);