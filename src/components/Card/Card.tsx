import {
    Card, CardContent
} from '@mui/material'
import { CSSProperties } from 'react'


export const BasicCard : React.FC<React.PropsWithChildren<{ style?: CSSProperties }>> = ({ children, style }) => {
    return (
        <>
            <Card style={style} elevation={5}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </>
    )
}