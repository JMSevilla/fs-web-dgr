
type PathProps = {
    path: string
}

type RouteProps = {
    homepage : PathProps
}

export const PageProps : RouteProps = {
    homepage: { path: "/" }
}
