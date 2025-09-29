import React, { useState } from "react";
import { CanvasManager } from "../managers/CanvasManager";
import { generateObjects } from "../services/ApiService";

interface PromptPanelProps {
    canvasManager: CanvasManager;
}

const PromptPanel: React.FC<PromptPanelProps> = ({ canvasManager }) => {
    const [prompt, setPrompt] = useState<string>("");

    const handleSendPrompt = async () => {
        if (!prompt) return;
        try {
            const objetos = canvasManager.getObjetos();
            const result = await generateObjects(prompt, objetos);

            if (result.success && result.objetos) {
                const added = canvasManager.agregarObjetos(result.objetos);
                console.log("Objetos: ", added);
            } else {
                console.log("Error al generar diagrama: ", result.error);
            }
        } catch (err) {
            console.error(err);
        }
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
