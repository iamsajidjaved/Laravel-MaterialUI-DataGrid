# Material UI & Laravel DataTable

[![NPM](https://img.shields.io/npm/v/material_ui_react_laravel_table.svg)](https://www.npmjs.com/package/material_ui_react_laravel_table) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save material_ui_react_laravel_table
```

## Usage

#### Step 01(Import the plugin)

```jsx
import { ReactMaterialUIGrid } from 'material_ui_react_laravel_table'
import 'material_ui_react_laravel_table/dist/index.css'
const axios = require('axios')
```

#### Step 02(Bring Data and store in the state)

```jsx
const [users, setUsers] = React.useState(null)

axios
  .get('http://localhost:8000?page=' + page)
  .then(function (response) {
    setUsers(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
```

#### Step 03(Define Columns Headers)

```jsx
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
    width: 130
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
```

#### Step 04(Component)

```jsx
<ReactMaterialUIGrid
  columns={columns}
  data={users}
  options={{
    autoPageSize: false,
    autoHeight: true,
    pagination: {
      pagination: true,
      paginationMode: 'server'
    },
    components: {
      Toolbar: 'GridToolbar'
    },
    parentDivCSS: {
      width: '61.8%'
    }
  }}
/>
```

## Sample Code

Github: https://github.com/sajidfrommerqata/material_ui_react_laravel_table
