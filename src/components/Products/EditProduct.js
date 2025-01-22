import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert, Typography } from '@mui/material';
import { productoService } from '../../services/productServices';
import TextField from '@mui/material/TextField';

function EditProduct({ product, onClose, onRefresh }) {
    const [nombre, setNombre] = useState(product?.nombre || '');
    const [precio, setPrecio] = useState(product?.precio || '');
    const [descripcion, setDescripcion] = useState(product?.descripcion || '');
    const [cantidad, setCantidad] = useState(product?.cantidad || '');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(true);

    useEffect(() => {
        if (product) {
            setNombre(product.nombre);
            setDescripcion(product.descripcion);
            setPrecio(product.precio);
            setCantidad(product.cantidad);
        }
    }, [product]);

    const handleSave = async () => {
        setError('');
        try {
            const updatedProduct = {
                id: product.id,
                nombre,
                descripcion,
                precio: parseFloat(precio),
                cantidad: parseInt(cantidad, 10),
            };

            await productoService.updateProducto(product.id, updatedProduct);
            setSuccessMessage('Producto actualizado!');
            setOpenSnackbar(true);
            onRefresh();
            setTimeout(() => {
                setDialogOpen(false);
                onClose();
            }, 1000);
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            setError('Ocurrió un error al intentar actualizar el producto. Por favor, inténtelo nuevamente.');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        onClose();
    };

    if (!product) return null;

    return (
        <>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogContent>
                    {error && (
                        <Typography color="error" style={{ marginBottom: 16 }}>
                            {error}
                        </Typography>
                    )}
                    <TextField 
                        label="Nombre" 
                        variant="standard" 
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} 
                        style={{ width: '100%', padding: 8, marginTop: 4 }} 
                    />
                    <TextField 
                        label="Descripcion" 
                        variant="standard" 
                        value={descripcion} 
                        multiline
                        onChange={(e) => setDescripcion(e.target.value)} 
                        style={{ width: '100%', padding: 8, marginTop: 4 }} 
                    />
                    <TextField
                        label="Precio"
                        type="number"
                        variant="standard"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                    <TextField
                        label="Cantidad"
                        type="number"
                        variant="standard"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar 
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default EditProduct;