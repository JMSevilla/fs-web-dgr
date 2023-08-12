import React from 'react'
import { ApplicationBar } from '../../components'
import { Typography } from '@mui/material'
const HomePage: React.FC = () => {
    const handleOnShowAlert = () => {
        alert("Hello world")
    }
    return (
        <>
            <ApplicationBar 
            onHandleClick={handleOnShowAlert}
            title='hello wrld' />
        </>
    )
}

export default HomePage

