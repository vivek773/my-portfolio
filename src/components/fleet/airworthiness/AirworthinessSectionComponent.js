// Airworthiness Section

// Default
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI components
import Box from '@mui/material/Box';

// Custom 
import DataTable from '../../table/TableComponent';
import Spinner from "../../../components/spinner/SpinnerComponent"

const AirworthinessSectionComponent = () => {
    const fleet = useSelector((state) => state.fleet)
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const newRows = fleet?.airworthinessDirectives?.map((item, index) => ({
            id: index + 1,
            ad_id: item.ad_id || '',
            tail_number: item.tail_number || '',
            tenant_id: item.tenant_id || '',
            ad_title: item.ad_title || '',
            due_at_engine_one_tach_hours: item.due_at_engine_one_tach_hours || null,
            due_at_engine_two_tach_hours: item.due_at_engine_two_tach_hours || null,
        }));

        setRows([...newRows])

    }, [fleet])

    const columns = [
        { field: 'ad_id', headerName: 'AD ID', width: 200 },
        { field: 'tail_number', headerName: 'Tail Number', width: 150 },
        { field: 'tenant_id', headerName: 'Tenant ID', width: 200 },
        { field: 'ad_title', headerName: 'AD Title', width: 200 },
        { field: 'due_at_engine_one_tach_hours', headerName: 'Due at Engine One (Tach Hours)', width: 250 },
        { field: 'due_at_engine_two_tach_hours', headerName: 'Due at Engine Two (Tach Hours)', width: 250 },
    ];

    return (
        <Box mt={5}>
            {rows?.length === 0 ?
                <Spinner show={rows?.length === 0} />
                :
                <DataTable rows={rows} columns={columns} />
            }
        </Box>
    )
}

export default AirworthinessSectionComponent;