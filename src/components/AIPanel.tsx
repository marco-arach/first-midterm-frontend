import React from "react";
import ImageUploader from "./ImageUploader";
import PromptPanel from "./PromptPanel";

interface AIPanelProps {
    pizarraId: string;
}

const AIPanel: React.FC<AIPanelProps> = ({ pizarraId }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ flex: 0.4, display: "flex", flexDirection: "column", marginBottom: "8px" }}>
                <ImageUploader
                    pizarraId={pizarraId}
                />
            </div>
            <div style={{ flex: 0.6, display: "flex", flexDirection: "column" }}>
                <PromptPanel
                    pizarraId={pizarraId}
                />
            </div>
        </div>
    );
};

export default AIPanel;
