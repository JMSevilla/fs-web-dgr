import { Switch, Route } from 'react-router-dom'
import { Home , About } from '../pages'
import { PageProps } from './route'
import { GlobalContextProvider } from '../core/context/GlobalContext'
import {
    QueryClient,
    QueryClientProvider
} from 'react-query'
interface IRouterWithLoad {
    Component: React.ComponentType
    exact?: any
    path?: string | undefined
}
const queryClient = new QueryClient({});

const DynamicRouting: React.FC<IRouterWithLoad> = ({
    Component, ...rest
}) => {
    return (
        <>
            <Route 
            {...rest}
            render={(props: any) => (
                <>
                    <Component {...props} />
                </>
            )}
            />
        </>
    )
}

const ApplicationRouter = () => {
    return (
        <Switch>
            <QueryClientProvider client={queryClient}>
                <GlobalContextProvider>
                    <DynamicRouting 
                        exact
                        path={PageProps.homepage.path}
                        Component={Home}
                    />
                    <DynamicRouting 
                        exact
                        path={PageProps.aboutus.path}
                        Component={About}
                    />
                </GlobalContextProvider>
            </QueryClientProvider>
        </Switch>
    )
}

export default ApplicationRouter