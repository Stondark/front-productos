import * as React from 'react';
import Box from '@mui/material/Box';
import PaginatedTable from './PaginatedTable';

export default function Index() {

    return (
        <Box
            component="section"
            sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >


            <PaginatedTable />

        </Box>
    );
}
