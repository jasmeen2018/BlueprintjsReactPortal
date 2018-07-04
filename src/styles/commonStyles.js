export const marginWidths = {
    small: 10,
    medium: 20,
    large: 30
}

export const margins = {
    Top: {},
    Bottom: {},
    Left: {},
    Right: {}
}

// generate margins

for ( let direction in margins ) {
    
    const style = {}

    for ( let width in marginWidths ) {
        style[width] = {}
        style[width][`margin${direction}`] = marginWidths[width]
    }

    margins[direction] = style

}

export const fullHeight = {
    height: '100%'
}

export const fullWidth = {
    height: '100%'
}

export const coverParent = {
    ...fullHeight,
    ...fullWidth
}

export const centeredElements = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

export const text = {
    center: {
        textAlign: 'center'
    }
}