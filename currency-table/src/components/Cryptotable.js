import React, {useState, useEffect} from "react";
import { DataGrid , GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'ASSET',
    width: 150,
    editable: true,
  },
  {
    field: 'price_usd',
    headerName: 'PRICE(USD)',
    width: 150,
    type: 'number',
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").market_data.price_usd;
    }
  },
  {
    field: 'change1h',
    headerName: 'CHANGE VS USD (1H)',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").market_data.percent_change_usd_last_1_hour;
    }
    },
    {
    field: 'change24h',
    headerName: 'CHANGE VS USD (24H)',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").market_data.percent_change_usd_last_24_hours;
        }
    },
    {
    field: 'daytrend',
    headerName: '7 DAY TREND',
    width: 200,
    editable: true,
    // valueGetter: (params) => {
    //     return params.getValue(params.id, "metrics").market_data.price_usd;
    // }
    },
    {
    field: 'reportedcap',
    headerName: 'REPORTED MARKETCAP',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").marketcap.marketcap_dominance_percent;
        }
    },
    {
    field: 'realvolume',
    headerName: 'REAL VOLUME (24H)',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").market_data.volume_last_24_hours;
        }
    },
    {
    field: 'changevsusd7d',
    headerName: 'CHANGE VS USD (7D)',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").roi_data.percent_change_last_1_week;
        }
    },
    {
    field: 'changevsusd30d',
    headerName: 'CHANGE VS USD (30D)',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").roi_data.percent_change_last_1_month;
        }
    },
    {
    field: 'changevsusdytd',
    headerName: 'CHANGE VS USD (YTD)',
    type: 'number',
    width: 200,
    editable: true,
    valueGetter: (params) => {
        return params.getValue(params.id, "metrics").roi_data.percent_change_last_1_year;
        }
    },
];

const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }


const Cryptotable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    
    // I think it would be good to use websockets for real time data, I just haven't configured that before, I guess is not that difficult once I see how to do it.
     
     async function fetchData() {
         const result = await axios('https://data.messari.io/api/v1/assets?fields=id,name,slug,symbol,metrics/market_data,metrics/marketcap,metrics/roi_data');
         setData(result.data.data);
         //console.log(result.data.data);
        }

    return (
        <div style={{ height: 400, width: '90%' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            components={{
                Toolbar: CustomToolbar,
            }}
          />
        </div>
    );
}

export default Cryptotable;