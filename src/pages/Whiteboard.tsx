import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Canvas from "../components/Canvas";
import { CanvasManager } from "../managers/CanvasManager";
import Toolbar from "../components/Toolbar";
import ClassModal from "../components/ClassModal";
import RelationshipModal from "../components/RelationshipModal";
import AIPanel from "../components/AIPanel";

const Whiteboard: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTool, setActiveTool] = useState<string>("select");
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [relationshipModalOpen, setRelationshipModalOpen] = useState(false);

    const canvasManager = useMemo(
        () => new CanvasManager(),
        [projectId]
    );

    return (
        <div
            className="whiteboard-page"
            style={{
                display: "flex",
                flexDirection: "row",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#f8faf5ff",
            }}
        >
            <div
                style={{
                    width: "90%",
                    height: "100%",
                    position: "relative",
                }}
            >
                <Canvas
                    canvasManager={canvasManager}
                    activeTool={activeTool}
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                        padding: "8px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        zIndex: 10,
                        width: "100%",
                        maxWidth: "90%",
                        justifyContent: "center",
                    }}
                >
                    <Toolbar
                        activeTool={activeTool}
                        setActiveTool={setActiveTool}
                        onOpenRelationshipModal={() => setRelationshipModalOpen(true)}
                        canvasManager={canvasManager}
                    />
                </div>
            </div>
            <div
                style={{
                    width: "10%",
                    minWidth: "250px",
                    height: "100%",
                    borderLeft: "1px solid #ddd",
                    backgroundColor: "#fff",
                    padding: "8px",
                    overflowY: "auto",
                }}
            >
                <AIPanel
                    pizarraId={projectId || ""}
                />
                <ClassModal
                    selectedClass={selectedClass}
                    setSelectedClass={setSelectedClass}
                    canvasManager={canvasManager}
                />
            </div>
            <RelationshipModal
                open={relationshipModalOpen}
                onClose={() => setRelationshipModalOpen(false)}
                onSelect={(toolId) => setActiveTool(toolId)}
                activeTool={activeTool}
            />
        </div>
    );
};

export default Whiteboard;
