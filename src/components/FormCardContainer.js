import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

const FormCardContainer = ({
    children,
    title = '',
    width = 0
}) => (
    <Card
        style={{
            width: width || 500
        }}
        elevation={Elevation.TWO}
    >
        <h1>{title}</h1>
        {children}
    </Card>
)

export default FormCardContainer