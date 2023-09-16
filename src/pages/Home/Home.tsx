import React, { useState, useEffect, useCallback, ChangeEvent, ReactElement } from 'react'
import { ApplicationBar, BasicCard, BasicButton, BasicDataGrid } from '../../components'
import { Container, Grid, Typography } from '@mui/material'
import { useGlobalContext } from '../../core/context/GlobalContext'
import { Http } from '../../core/api/http'
import { useHistory } from 'react-router-dom'
import { PostsDataUpdate } from '../../core/types'
import { PostInfer, BasePostSchema } from '../../core/schema/post-schema'
import { PostAtom } from '../../core/atoms/post-atom'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { ControlledTextField } from '../../components'
import { useAtom } from 'jotai'
import { AxiosResponse } from 'axios'
type PostProps = { 
    id: number
    title: string
    author: string
    firstname: string
    middlename: string
    lastname: string
    status: number
}
const PostForm = () => {
    const {
        control, setValue
    } = useFormContext<PostInfer>()
    useEffect(() => {
        setValue('id', 4)
        setValue('status', 1)
    }, [])
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4}>
                    <ControlledTextField 
                        control={control}
                        name='firstname'
                        required
                        shouldUnregister
                        label='First name'
                    />
                </Grid>
                <Grid item xs={4}>
                    <ControlledTextField 
                        control={control}
                        name='middlename'
                        shouldUnregister
                        label='Middle name'
                    />
                </Grid>
                <Grid item xs={4}>
                <ControlledTextField 
                        control={control}
                        name='lastname'
                        required
                        shouldUnregister
                        label='Last name'
                    />
                </Grid>
            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <ControlledTextField 
                        control={control}
                        name='title'
                        shouldUnregister
                        label='Title'
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                <ControlledTextField 
                        control={control}
                        name='author'
                        shouldUnregister
                        label='Author'
                        required
                    />
                </Grid>
            </Grid>
        </>
    )
}

const HomePage = () => {
    const [posts, setPosts] = useState<PostProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [postDetails, setPostDetails] = useAtom(PostAtom)
    const router = useHistory()

    const form = useForm<PostInfer>({
        mode: 'all',
        resolver: zodResolver(BasePostSchema),
        defaultValues : postDetails
    })
    const {
        formState: { isValid },
        handleSubmit
    } = form;
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
        new Http().fetchSomethingFromDB() // api from spring boot server
        .then(res => {
            setPosts(res.data)
        })
    }
    const FetchDataWhenClicked = () => {
        
    }
    const handleSave = () => {
        handleSubmit(
            (values) => {
                new Http().createPost(values)
                .then((res: AxiosResponse | undefined) => {
                    console.log(res?.data)
                    FetchPosts()
                })
            }
        )()
        return false;
    }
    useEffect(() => {
        FetchPosts()
    }, [])
    return ( 
        <>
            <ApplicationBar 
                onHandleClick={navigateToAboutUs}
                title="Navbar"
            />
            <Container sx={{
                marginTop: '100px'
            }} maxWidth='lg'>
                <Container>
                    <BasicCard style={{ marginBottom: '20px'}}>
                        {/* <PostForm /> */}
                        <FormProvider {...form}>
                            <PostForm />
                            <BasicButton 
                                sx={{
                                    float: 'right',
                                    mt: 2,
                                    mb: 2
                                }}
                                variant='contained'
                                size='small'
                                children='SAVE'
                                disabled={!isValid}
                                onClick={handleSave}
                            />
                        </FormProvider>
                    </BasicCard>
                    <BasicCard style={{
                        marginTop: '20px'
                    }}>
                        {/* <BasicButton 
                                sx={{ float: 'right', mt: 1, mb: 1}}
                                children='FETCH DATA'
                                variant='contained'
                                color='primary'
                                onClick={FetchDataWhenClicked}
                        /> */}
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