import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import styles from './styles.module.css'
import { DataGrid, GridOverlay } from '@material-ui/data-grid'
import CircularProgress from '@material-ui/core/CircularProgress'

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div
        style={{
          position: 'relative',
          top: '50%',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <CircularProgress />
      </div>
    </GridOverlay>
  )
}

export const ReactMaterialUIGrid = forwardRef((props, ref) => {
  const [loading, setLoading] = React.useState(false)
  const [filterModel, setFilterModel] = React.useState('')
  const [sortModel, setSortModel] = React.useState('')

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
            setFilterModel(params.filterModel.items[0])
            props.getUsersFun(
              props.data.current_page,
              parseInt(props.data.per_page),
              params.filterModel.items[0],
              sortModel
            )
          }
        }}
        disableColumnMenu={true}
        sortingMode='server'
        onSortModelChange={(params) => {
          if (params.sortModel[0]) {
            setLoading(true)
            setSortModel(params.sortModel[0])
            props.getUsersFun(
              props.data.current_page,
              parseInt(props.data.per_page),
              filterModel,
              params.sortModel[0]
            )
          }
        }}
        loading={loading}
        components={{
          LoadingOverlay: CustomLoadingOverlay
        }}
      />
    </div>
  )
})
