import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Snackbar, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import { productoService } from '../../services/productServices';

function CreateProductDialog({ onClose, onRefresh }) {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(true);

    const handleCreate = async () => {
        setError('');
        try {
            if (!nombre || !precio || !cantidad || !descripcion) {
                setError('Todos los campos son obligatorios.');
                return;
            }

            const newProduct = {
                nombre,
                precio: parseFloat(precio),
                cantidad: parseInt(cantidad, 10),
                descripcion
            };

            await productoService.createProducto(newProduct);
            setSuccessMessage('Producto creado con éxito!');
            setOpenSnackbar(true);
            onRefresh();
            setTimeout(() => {
                setDialogOpen(false);
                onClose();
            }, 1000);
        } catch (err) {
            console.error('Error al crear el producto:', err);
            setError('Ocurrió un error al intentar crear el producto. Por favor, inténtelo nuevamente.');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        onClose();
    };

    return (
        <>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Crear Nuevo Producto</DialogTitle>
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
                    <Button onClick={handleCreate} color="primary" variant="contained">
                        Crear
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

export default CreateProductDialog;