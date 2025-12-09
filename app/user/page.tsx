import React from 'react';

const UserPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
            <p className="mb-2">Aquí puedes ver y editar tus datos personales.</p>
            {/* Aquí se pueden agregar componentes para mostrar y editar la información del usuario */}
        </div>
    );
};

export default UserPage;