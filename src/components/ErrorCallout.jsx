import React, { PureComponent } from 'react';
import { Callout } from '@blueprintjs/core';
import { margins } from '../styles/commonStyles';

export default class ErrorCallout extends PureComponent {

    render () {

        const {
            msg
        } = this.props;

        return (
            msg ?
                <Callout intent="danger" style={margins.Top.medium}>
                    {msg}
                </Callout>
            : null
        )

    }

}