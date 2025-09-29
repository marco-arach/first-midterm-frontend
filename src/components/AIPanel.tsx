import React from "react";
import ImageUploader from "./ImageUploader";
import PromptPanel from "./PromptPanel";
import { CanvasManager } from "../managers/CanvasManager";

interface AIPanelProps {
    canvasManager: CanvasManager;
}

const AIPanel: React.FC<AIPanelProps> = ({ canvasManager }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 0.4, display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                <ImageUploader
                    canvasManager={canvasManager}
                />
            </div>
            <div style={{ flex: 0.6, display: "flex", flexDirection: "column" }}>
                <PromptPanel
                    canvasManager={canvasManager}
                />
            </div>
        </div>
    );
};

export default AIPanel;
