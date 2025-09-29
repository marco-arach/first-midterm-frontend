import React from "react";
import { useParams } from "react-router-dom";

const Whiteboard: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Whiteboard</h1>
            <p className="mt-2">Proyecto seleccionado: {projectId}</p>
        </div>
    );
};

export default Whiteboard;
