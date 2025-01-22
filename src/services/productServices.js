const API_URL = 'http://127.0.0.1:8000/api';

export const productoService = {
    getProductos: async (page) => {
        try {
            const response = await fetch(`${API_URL}/productos?page=${page + 1}`);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching productos:', error);
            throw error;
        }
    },

    updateProducto: async (id, producto) => {
        try {
            const response = await fetch(`${API_URL}/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(producto),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating producto:', error);
            throw error;
        }
    },

    deleteProducto: async (id) => {
        try {
            const response = await fetch(`${API_URL}/productos/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting producto:', error);
            throw error;
        }
    },


    createProducto: async (producto) => {
        const response = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(producto),
        });
        if (!response.ok) {
            throw new Error('Error al crear el producto');
        }
        return await response.json();
    },
};