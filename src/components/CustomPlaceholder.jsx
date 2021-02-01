import React from 'react'
import { Placeholder } from 'semantic-ui-react'

const CustomPlaceholder = () => {
    return (
        <>
            <Placeholder style={{ height: 150, width: 150 }}>
                <Placeholder.Image />
            </Placeholder>
        </>
    )
}

export default CustomPlaceholder
