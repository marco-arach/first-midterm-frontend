import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Canvas from "../components/Canvas";
import { CanvasManager } from "../managers/CanvasManager";
import Toolbar from "../components/Toolbar";
import ClassModal from "../components/ClassModal";
import RelationshipModal from "../components/RelationshipModal";
import AIPanel from "../components/AIPanel";
import { SocketClient } from "../services/SocketClient";
import ShareModal from "../components/ShareModal";
import { Share2 } from "lucide-react";

const Whiteboard: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [activeTool, setActiveTool] = useState<string>("select");
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [relationshipModalOpen, setRelationshipModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    const socketClient = useMemo(
        () => new SocketClient(projectId || ""),
        [projectId]
    );

    const canvasManager = useMemo(
        () => new CanvasManager(socketClient),
        [projectId, socketClient]
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
                <div
                    style={{
                        position: "absolute",
                        top: "20px",
                        right: "20px",
                        zIndex: 20,
                    }}
                >
                    <button
                        onClick={() => setShareModalOpen(true)}
                        style={{
                            background: "#a4e19eff",
                            border: "1px solid #0d0e0dff",
                            borderRadius: "50%",
                            padding: "10px",
                            cursor: "pointer",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                        }}
                        title="Compartir"
                    >
                        <Share2 size={20} color="#333" />
                    </button>
                </div>
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
                    canvasManager={canvasManager}
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
            <ShareModal
                open={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
            />
        </div>
    );
};

export default Whiteboard;
