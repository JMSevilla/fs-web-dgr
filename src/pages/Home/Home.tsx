import React, { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { ApplicationBar, BasicTextField, BasicCard, BasicButton } from '../../components'
import { Container, Grid, List, ListItem } from '@mui/material'
import { useGlobalContext } from '../../core/context/GlobalContext'
import axios , {AxiosResponse} from 'axios'
import { config } from '../../core/config'

const HomePage: React.FC = () => {
    const [names, setNames] = useState([])
    const {
        state,
        setState
    } = useGlobalContext()
    const handleChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState : any) => ({
            ...prevState,
            [name] : value
        }))
    }
    const FetchFakeAPI = () => {
        axios.get(
            `${config.values.DEV_URL}/users`
        ).then((response: AxiosResponse | undefined) => {
            setNames(response?.data)
        })
    }
    useEffect(() => {
        FetchFakeAPI()
    }, [])
    return ( 
        <>
            <ApplicationBar 
            onHandleClick={() => {}}
            title={"Hello world"} />
            <Container sx={{
                marginTop: '100px'
            }} maxWidth='lg'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                        <BasicCard>
                            <BasicTextField 
                                label='Firstname'
                                placeholder='Enter firstname'
                                name='firstname'
                                onChange={handleChangeEvent}
                                value={state.firstname}
                            />
                            <BasicTextField 
                                label='Middlename'
                                placeholder='Enter middlename'
                                name='middlename'
                                onChange={handleChangeEvent}
                                value={state.middlename}
                            />
                            <BasicTextField 
                                label='Lastname'
                                placeholder='Enter lastname'
                                name='lastname'
                                onChange={handleChangeEvent}
                                value={state.lastname}
                            />
                            <BasicButton 
                                sx={{ float: 'right', mt: 2, mb: 2}}
                                children='SUBMIT'
                                variant='contained'
                                color='primary'
                            />
                        </BasicCard>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <List>
                    {names.map((data: any, i) => (
                        <ListItem key={i}>{data.name}</ListItem>
                    ))}
                </List>
            </Container>
        </>
    )
}
export default HomePage

