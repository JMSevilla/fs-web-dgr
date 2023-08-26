
type PathProps = {
    path: string
}

type RouteProps = {
    homepage : PathProps
    aboutus : PathProps
}

export const PageProps : RouteProps = {
    homepage: { path: "/" },
    aboutus: { path: "/AboutUs/about-us"}
}
