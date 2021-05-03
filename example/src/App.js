import React, { useEffect, useRef } from 'react'
import { ReactMaterialUIGrid } from 'material_ui_react_laravel_table'
import 'material_ui_react_laravel_table/dist/index.css'
const axios = require('axios')

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70
  },
  {
    field: 'category_name',
    headerName: 'Category name',
    width: 130
  },
  {
    field: 'catalogue_sub_category_id',
    headerName: 'Sub-Category ID',
    width: 130
  },
  {
    field: 'category_image',
    headerName: 'Category Image',
    width: 200
  },
  {
    field: 'created_at',
    headerName: 'Created at',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    renderCell: (params) => <strong>HTML</strong>
  }
]

const App = () => {
  const childRef = useRef()

  const [users, setUsers] = React.useState(null)
  const [isDataLoaded, setIsDataLoaded] = React.useState(false)

  useEffect(() => {
    if (!isDataLoaded) {
      getUsers()
    }

    setIsDataLoaded(true)
  }, [isDataLoaded])

  const getUsers = (
    page = 1,
    pageSize = 5,
    filters = '',
    sorting = '',
    item_type_id = '',
    vendor_business_id = '',
    status = '',
    user_id = '',
    from_date = '',
    to_date = ''
  ) => {
    console.log(
      page,
      pageSize,
      filters,
      sorting,
      item_type_id,
      vendor_business_id,
      status,
      user_id,
      from_date,
      to_date
    )
    axios
      .get(
        'https://portal-dev-api.merqata.com/?page=' +
          page +
          '&pageSize=' +
          parseInt(pageSize) +
          '&filters=' +
          JSON.stringify(filters) +
          '&sorting=' +
          JSON.stringify(sorting)
      )
      .then(function (response) {
        setUsers(response.data)
        childRef.current.toggleLoader(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  return (
    <div>
      {users != null ? (
        <div>
          <ReactMaterialUIGrid
            ref={childRef}
            columns={columns}
            data={users}
            options={{
              autoHeight: true,
              rowHeight: 100,
              autoPageSize: false,
              filters: {
                disableColumnFilter: false
              },
              pagination: {
                pagination: true,
                paginationMode: 'server'
              },
              components: {
                Toolbar: 'GridToolbar'
              },
              parentDivCSS: {
                // width: '61.8%',
                // height: '400px'
              }
            }}
            getUsersFun={getUsers}
            disableColumnFilter
            topFilters={[
              'item_type_id',
              'vendor_business_id',
              'status',
              'user_id',
              'from_date',
              'to_date'
            ]}
          />
        </div>
      ) : null}
    </div>
  )
}

export default App
