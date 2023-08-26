import { Switch, Route } from 'react-router-dom'
import { Home } from '../pages'
import { PageProps } from './route'
import { GlobalContextProvider } from '../core/context/GlobalContext'
interface IRouterWithLoad {
    Component: React.ComponentType
    exact?: any
    path?: string | undefined
}

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
            <GlobalContextProvider>
                <DynamicRouting 
                    exact
                    path={PageProps.homepage.path}
                    Component={Home}
                />
            </GlobalContextProvider>
        </Switch>
    )
}

export default ApplicationRouter