import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import styles from './styles.module.css'
import { DataGrid, GridOverlay } from '@material-ui/data-grid'
import LinearProgress from '@material-ui/core/LinearProgress'

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: 'absolute', top: 0, width: '100%' }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  )
}

export const ReactMaterialUIGrid = forwardRef((props, ref) => {
  const [loading, setLoading] = React.useState(false)

  useImperativeHandle(ref, () => ({
    toggleLoader(value) {
      setLoading(value)
    }
  }))

  return (
    <div style={props.options.parentDivCSS} id='parentDiv'>
      <DataGrid
        autoPageSize={props.options.autoPageSize}
        autoHeight={props.options.autoHeight}
        rowHeight={props.options.rowHeight}
        disableClickEventBubbling={props.options.disableClickEventBubbling}
        disableSelectionOnClick
        columns={props.columns.map((column) => ({
          ...column,
          disableClickEventBubbling: true
        }))}
        rows={props.data.data.map((row) => ({
          ...row,
          disableSelectionOnClick: true
        }))}
        pagination={props.options.pagination.pagination}
        paginationMode={props.options.pagination.paginationMode}
        pageSize={parseInt(props.data.per_page)}
        rowsPerPageOptions={[5, 10, 30]}
        rowCount={props.data.total}
        onPageChange={(params) => {
          setLoading(true)
          props.getUsersFun(
            params.page + 1,
            params.pageSize,
            '',
            props?.topFilters[0],
            props?.topFilters[1],
            props?.topFilters[2],
            props?.topFilters[3],
            props?.topFilters[4],
            props?.topFilters[5]
          )
        }}
        onPageSizeChange={(params) => {
          setLoading(true)
          props.getUsersFun(
            1,
            params.pageSize,
            '',
            props?.topFilters[0],
            props?.topFilters[1],
            props?.topFilters[2],
            props?.topFilters[3],
            props?.topFilters[4],
            props?.topFilters[5]
          )
        }}
        page={props.data.current_page - 1}
        disableColumnFilter={props.options.filters.disableColumnFilter}
        onFilterModelChange={(params) => {
          if (params.filterModel.items[0]) {
            setLoading(true)
            props.getUsersFun(
              props.data.current_page,
              parseInt(props.data.per_page),
              params.filterModel.items[0]
            )
          }
        }}
        disableColumnMenu={true}
        loading={loading}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
      />
    </div>
  )
})
