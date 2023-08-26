import React, { useState, useEffect, useCallback } from 'react'
import { ApplicationBar } from '../../components'
import { Typography } from '@mui/material'
import { useGlobalContext } from '../../core/context/GlobalContext'
const HomePage: React.FC = () => {
    const {
        state, setState, handleFunction
    } = useGlobalContext()
    return ( 
        <>
            <ApplicationBar 
            onHandleClick={handleFunction}
            title={"Hello world"} />
            
        </>
    )
}
export default HomePage

