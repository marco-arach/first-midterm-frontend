import React from 'react';

interface RelationshipModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (toolId: string) => void;
    activeTool: string;
}

const relationshipOptions = [
    { id: 'one_to_one', label: '1:1' },
    { id: 'one_to_many', label: '1:N' },
    { id: 'many_to_one', label: 'N:1' },
    { id: 'many_to_many', label: 'N:N' },
];

const RelationshipModal: React.FC<RelationshipModalProps> = ({ open, onClose, onSelect, activeTool }) => {
    if (!open) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
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
                minWidth: '200px',
                color: 'white',
                boxShadow: '0 0 15px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
            }}>
                {relationshipOptions.map(opt => (
                    <div
                        key={opt.id}
                        onClick={() => { onSelect(opt.id); onClose(); }}
                        style={{
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            backgroundColor: activeTool === opt.id ? '#333' : 'transparent',
                            borderRadius: '4px',
                            textAlign: 'center',
                        }}
                    >
                        {opt.label}
                    </div>
                ))}

                <button
                    onClick={onClose}
                    style={{
                        marginTop: '0.5rem',
                        padding: '0.4rem 0.8rem',
                        backgroundColor: '#dc2626',
                        borderRadius: '4px',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default RelationshipModal;
