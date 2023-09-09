import React, { useState, useEffect, useCallback, ChangeEvent, ReactElement } from 'react'
import { ApplicationBar, BasicTextField, BasicCard, BasicButton, BasicDataGrid } from '../../components'
import { Container, Grid, Typography } from '@mui/material'
import { useGlobalContext } from '../../core/context/GlobalContext'
import { Http } from '../../core/api/http'
import { useHistory } from 'react-router-dom'
import { PostsDataUpdate } from '../../core/types'
type PostProps = { 
    id: number
    title: string
    author: string
    firstname: string
    middlename: string
    lastname: string
    status: number
}

const HomePage = () => {
    const [posts, setPosts] = useState<PostProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const router = useHistory()
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
    const navigateToAboutUs = () => {
        router.push({
            pathname: '/AboutUs/about-us',
            state: {
                obj: state
            }
        })
    }
    const ToggleActivation = (props: PostsDataUpdate) => {
        new Http().updatePostsChangeStatus(props)
        .then(res => {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
            setPosts(res.data)
            }, 2000)
            FetchPosts()
        })
    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID', // column name
            width: 80
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 170,
            renderCell: (params: any) => (
                <Typography variant='caption'>
                    {params.row.title}
                </Typography>
            )
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            valueGetter: (params: any) => `${params.row.firstname} ${params.row.middlename} ${params.row.lastname}`,
            width: 180
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 80
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 80,
            renderCell: (params: any) => {
                if(params.row.status === 1){
                    return `Active`
                } else {
                    return `Inactive`
                }
            }
        },
        {
            headerName: 'Actions',
            width: 170,
            renderCell: (params: any) => {
                if(params.row.status === 1) {
                    return (
                        <BasicButton 
                            variant='contained'
                            color='error'
                            children='Deactivate'
                            size='small'
                            onClick={
                                () => ToggleActivation({
                                    id: params.row.id,
                                    title: params.row.title,
                                    author: params.row.author,
                                    firstname: params.row.firstname,
                                    middlename: params.row.middlename,
                                    lastname: params.row.lastname,
                                    status: 0
                                })
                            }
                        />
                    )
                } else {
                    return (
                        <BasicButton 
                            variant='contained'
                            color='success'
                            children='Activate'
                            size='small'
                            onClick={
                                () => ToggleActivation({
                                    id: params.row.id,
                                    title: params.row.title,
                                    author: params.row.author,
                                    firstname: params.row.firstname,
                                    middlename: params.row.middlename,
                                    lastname: params.row.lastname,
                                    status: 1
                                })
                            }
                        />
                    )
                }
            }
        }
    ]
    const FetchPosts = () => {
        setLoading(!loading)
        new Http().fetchSomethingFromDB() // api from spring boot server
        .then(res => {
            setTimeout(() => {
                setLoading(false)
            setPosts(res.data)
            }, 2000)
        })
    }
    const FetchDataWhenClicked = () => {
        FetchPosts()
    }
    return ( 
        <>
            <ApplicationBar 
                onHandleClick={navigateToAboutUs}
                title="Navbar"
            />
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
                <Container>
                    <BasicCard style={{
                        marginTop: '20px'
                    }}>
                        <BasicButton 
                                sx={{ float: 'right', mt: 1, mb: 1}}
                                children='FETCH DATA'
                                variant='contained'
                                color='primary'
                                onClick={FetchDataWhenClicked}
                        />
                        <BasicDataGrid 
                            columns={columns}
                            data={posts}
                            loading={loading}
                        />
                    </BasicCard>
                </Container>
            </Container>
        </>
    )
}

export default HomePage


/**
 * Next TS
 * getLayout << Pages.. 
 * const getLayout = Component.getLayout ?? ((page) => page) // _app.tsx
 */