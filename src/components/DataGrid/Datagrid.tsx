import { DataGrid } from '@mui/x-data-grid'

type DataGridProps = {
    columns: any
    data: any
    loading?: boolean
}
export const BasicDataGrid = ({ columns, data, loading = false } : DataGridProps) => {
    return (
        <DataGrid 
            columns={columns}
            rows={data}
            loading={loading}
            sx={{ width: '100%', height: '50vh'}}
        />
    )
}

