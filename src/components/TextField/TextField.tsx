import {
    TextField, Typography
} from '@mui/material'
import { CSSProperties, ChangeEvent } from 'react'


type BasicTextFieldProps = {
    value?: string | undefined
    placeholder?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    label: string
    IsTextFieldDisabled?: boolean
    name: string
    style?: CSSProperties
}

export const BasicTextField: React.FC<BasicTextFieldProps> = ({
    value,
    placeholder,
    onChange,
    label,
    IsTextFieldDisabled,
    name,
    style
}) => {
    return (
        <>
            <Typography variant='caption' gutterBottom>{label}</Typography>
            <TextField 
                value={value ?? ""}
                placeholder={placeholder}
                onChange={onChange}
                variant='outlined'
                disabled={IsTextFieldDisabled}
                name={name}
                style={style}
                focused
                fullWidth
            />
        </>
    )
}