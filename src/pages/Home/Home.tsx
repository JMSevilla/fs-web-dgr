import React, { useState, useEffect, useCallback, ChangeEvent, ReactElement, useMemo } from 'react'
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
import { useQuery, useMutation } from 'react-query'
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
        handleSubmit, reset, setValue, watch
    } = form;
    const idWatch = watch('id')
    const {
        state,
        setState
    } = useGlobalContext()
    const navigateToAboutUs = () => {
        router.push({
            pathname: '/AboutUs/about-us',
            state: {
                obj: state
            }
        })
    }
    const { data, refetch } = useQuery({
        queryKey: 'fetchPosts',
        queryFn: () => new Http().fetchSomethingFromDB().then(res => res.data)
    })
    const useSubmission = () => {
        return useMutation((data : PostsDataUpdate) => 
            new Http().createPost(data)
        );
    }
    const { mutateAsync } = useSubmission()
    const handleSave = () => {
            handleSubmit(async (values) => {
                await mutateAsync(values, {
                    onSuccess: async (response : AxiosResponse | undefined) => {
                        await refetch()
                        reset({})
                    }
                })
            }
        )()
        return false;
    }
    const memoizedData = useMemo(() => {
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
                width: 250,
                renderCell: (params: any) => {
                    
                    return (
                        <div style={{
                            display: 'flex'
                        }}>
                            <BasicButton 
                                variant='contained'
                                color={
                                    params.row.status == 1 ? 'error' : 'success'
                                }
                                children={
                                    params.row.status == 1 ? 'Deactivate' : 'Activate'
                                }
                                size='small'
                                sx={{ 
                                    mr: 2
                                }}
                                onClick={
                                    () => ToggleActivation({
                                        id: params.row.id,
                                        title: params.row.title,
                                        author: params.row.author,
                                        firstname: params.row.firstname,
                                        middlename: params.row.middlename,
                                        lastname: params.row.lastname,
                                        status: params.row.status == 1 ? 0 : 1
                                    })
                                }
                            />
                            <BasicButton 
                                variant='contained'
                                color='error'
                                children='Delete'
                                size='small'
                                onClick={() => deletePost(params.row.id)}
                            /> 
                        </div>
                    )
                }
            }
        ]
        const ToggleActivation = (props: PostsDataUpdate) => {
            setLoading(true)
            new Http().updatePostsChangeStatus(props)
            .then(async res => {
                setLoading(false)
                await refetch()
            })
        }
        function deletePost(id : number) {
            new Http().deletePost(id)
            .then(async() => {
                await refetch()
            })
        }
        return (
            <>
                <BasicDataGrid 
                    columns={columns}
                    data={data ?? posts}
                    loading={loading}
                />
            </>
        )
    }, [data])
    useEffect(() => {
        let numId = 0
        setValue('id', numId++)
    }, [idWatch])
    useEffect(() => {}, [isValid])
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
                        {memoizedData}
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
 * 
 * React TS -> Single Render
 * Next -> Re-render
 */