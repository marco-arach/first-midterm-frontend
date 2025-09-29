import React from 'react';
import { CanvasManager } from "../managers/CanvasManager";
import { generateAndDownloadProject } from "../services/ApiService";

interface ToolbarProps {
    activeTool: string;
    setActiveTool: (tool: string) => void;
    canvasManager: CanvasManager;
    onOpenRelationshipModal: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    activeTool,
    setActiveTool,
    onOpenRelationshipModal,
    canvasManager
}) => {
    const tools = [
        { id: 'select', label: 'Seleccionar', src: '/icons/seleccionar_icon.png' },
        { id: 'class', label: 'Clase', src: '/icons/clase_icon.png' },
        { id: 'inheritance', label: 'Herencia', src: '/icons/herencia_icon.png' },
        { id: 'composition', label: 'Composición', src: '/icons/composicion_icon.png' },
        { id: 'aggregation', label: 'Agregación', src: '/icons/agregacion_icon.png' },
        { id: 'delete', label: 'Eliminar', src: '/icons/eliminar_icon.png' },
    ];

    return (
        <div
            className="bg-gray-800 text-white p-2"
            style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                width: '100%',
            }}
        >
            {tools.map(tool => (
                <div
                    key={tool.id}
                    className={`p-1 rounded cursor-pointer ${activeTool === tool.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    style={{ flex: '0 0 auto' }}
                    onClick={() => {
                        setActiveTool(tool.id);
                    }}
                    title={tool.label}
                >
                    <img src={tool.src} alt={tool.label} className="w-8 h-8" />
                </div>
            ))}
            <div
                className={`p-1 rounded cursor-pointer ${['one_to_one', 'one_to_many', 'many_to_one', 'many_to_many'].includes(activeTool) ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                style={{ flex: '0 0 auto' }}
                onClick={onOpenRelationshipModal}
                title="Relaciones"
            >
                <img src="/icons/asociacion_icon.png" alt="Relaciones" className="w-8 h-8" />
            </div>
            <div
                className="p-1 rounded cursor-pointer bg-green-600 hover:bg-green-500"
                style={{ flex: '0 0 auto' }}
                onClick={() => generateAndDownloadProject(canvasManager.getObjetos())}
                title="Generar SpringBoot"
            >
                <img src="/icons/spring_boot_icon.png" alt="SpringBoot" className="w-8 h-8" />
            </div>
        </div>
    );
};

export default Toolbar;
