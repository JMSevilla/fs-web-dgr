
export const config = {
    get values(){
        return {
            DEV_URL : process.env.REACT_APP_PUBLIC_API_BASEURL
        }
    }
}