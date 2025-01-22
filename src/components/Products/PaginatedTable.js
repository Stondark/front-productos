import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    IconButton,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { productoService } from '../../services/productServices';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import CreateProductDialog from './CreateProductDialog';

export default function PaginatedTable() {
    const [productos, setProductos] = useState([]);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 10;

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProductos = async (pageNumber) => {
        try {
            const data = await productoService.getProductos(pageNumber);
            setProductos(data.data);
            setTotalCount(data.total);
            setTotalPages(data.last_page);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    };

    useEffect(() => {
        fetchProductos(page);
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Paper sx={{ width: '50%' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setCreateModal(true)} 
                style={{ marginBottom: 16 }}
            >
                Crear Nuevo Producto
            </Button>
            <TableContainer>
                <Table aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="center">Descripcion</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((row) => (
                            <TableRow hover tabIndex={-1} key={row.id}>
                                <TableCell component="th" scope="row">{row.nombre}</TableCell>
                                <TableCell scope="row">{row.descripcion}</TableCell>
                                <TableCell align="right">{row.precio}</TableCell>
                                <TableCell align="right">{row.cantidad}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            setSelectedProduct(row);
                                            setEditModal(true);
                                        }}
                                        size="small"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => {
                                            setSelectedProduct(row);
                                            setDeleteModal(true);
                                        }}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                }
            />
            {editModal && (
                <EditProduct
                    product={selectedProduct}
                    onClose={() => setEditModal(false)}
                    onRefresh={() => fetchProductos(page)}
                />
            )}
            {deleteModal && (
                <DeleteProduct
                    product={selectedProduct}
                    onClose={() => setDeleteModal(false)}
                    onRefresh={() => fetchProductos(page)}
                />
            )}
            {createModal && (
                <CreateProductDialog
                    onClose={() => setCreateModal(false)}
                    onRefresh={() => fetchProductos(page)}
                />
            )}
        </Paper>
    );
}
