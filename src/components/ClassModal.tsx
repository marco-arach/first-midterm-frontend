import React, { useState, useEffect } from 'react';
import { UMLClass } from '../models/UMLClass';
import { CanvasManager } from "../managers/CanvasManager";

interface ClassModalProps {
    selectedClass: UMLClass | null;
    setSelectedClass: (cls: UMLClass | null) => void;
    canvasManager: CanvasManager;
}

const ClassModal: React.FC<ClassModalProps> = ({ selectedClass, setSelectedClass, canvasManager }) => {
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState('');

    useEffect(() => {
        if (selectedClass) {
            setName(selectedClass.name);
            setAttributes(selectedClass.attributes.join('\n'));
        }
    }, [selectedClass]);

    const handleSave = () => {
        if (!selectedClass) return;
        selectedClass.name = name || 'ClassName';
        selectedClass.attributes = attributes.split('\n').map(a => a.trim()).filter(Boolean);

        canvasManager.actualizarClase(selectedClass);

        setSelectedClass(null);
    };

    const handleClose = () => setSelectedClass(null);

    if (!selectedClass) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            <div style={{
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '8px',
                width: '320px',
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                color: 'white'
            }}>
                <h2 style={{ marginBottom: '0.5rem' }}>Editar Clase</h2>
                <input
                    type="text"
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.3rem', borderRadius: '4px', border: '1px solid #e4dedeff', color: 'white' }}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <textarea
                    rows={5}
                    style={{ width: '100%', padding: '0.3rem', borderRadius: '4px', border: '1px solid #e4dedeff', color: 'white', marginBottom: '0.5rem' }}
                    value={attributes}
                    onChange={e => setAttributes(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button style={{ padding: '0.4rem 0.8rem', backgroundColor: '#dc2626', borderRadius: '4px' }} onClick={handleClose}>Cerrar</button>
                    <button style={{ padding: '0.4rem 0.8rem', backgroundColor: '#16a34a', borderRadius: '4px' }} onClick={handleSave}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

export default ClassModal;
