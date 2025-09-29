import React, { useState } from "react";

interface PromptPanelProps {
    pizarraId: string;
}

const PromptPanel: React.FC<PromptPanelProps> = ({ }) => {
    const [prompt, setPrompt] = useState<string>("");

    const handleSendPrompt = async () => {
        if (!prompt) return;
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe tu prompt aquí..."
                style={{
                    flex: 1,
                    width: "100%",
                    resize: "none",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #e4dedeff",
                    boxSizing: "border-box",
                    marginBottom: "8px",
                    color: 'white'
                }}
            />
            <button
                onClick={handleSendPrompt}
                style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Enviar Prompt
            </button>
        </div>
    );
};

export default PromptPanel;
