import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { productoService } from '../../services/productServices';

function DeleteProduct({ product, onClose, onRefresh }) {
    const confirmarEliminacion = async () => {
        try {
            await productoService.deleteProducto(product.id);
            onRefresh();
            onClose();
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
                ¿Estás seguro de que deseas eliminar este producto?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={confirmarEliminacion} color="error" variant="contained">
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteProduct;
