import React, { useState } from "react";
import { generateDiagram } from "../services/ApiService";
import { CanvasManager } from "../managers/CanvasManager";

interface ImageUploaderProps {
    canvasManager: CanvasManager;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ canvasManager }) => {
    const [image, setImage] = useState<File | null>(null);

    const handleSendImage = async () => {
        if (!image) return;
        try {
            const result = await generateDiagram(image);

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
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setImage(e.target.files[0])}
                />
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        style={{ marginTop: "8px", width: "100%", objectFit: "contain", flexGrow: 1 }}
                    />
                )}
            </div>
            <button
                onClick={handleSendImage}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "8px",
                    borderRadius: "4px",
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Enviar Imagen
            </button>
        </div>
    );
};

export default ImageUploader;
