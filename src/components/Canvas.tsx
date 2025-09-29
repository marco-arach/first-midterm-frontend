import React, { useRef, useEffect, useLayoutEffect } from "react";
import { CanvasManager } from "../managers/CanvasManager";
import { GraphicsEngine } from "../engines/GraphicsEngine";

interface CanvasProps {
    canvasManager: CanvasManager;
    activeTool: string;
    selectedClass: any;
    setSelectedClass: (cls: any) => void;
}

const Canvas: React.FC<CanvasProps> = ({
    canvasManager,
    activeTool,
    selectedClass,
    setSelectedClass,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const engineRef = useRef<GraphicsEngine | null>(null);

    const resizeCanvas = () => {
        if (!canvasRef.current || !containerRef.current) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;

        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (engineRef.current) engineRef.current.repaint();
    };

    useLayoutEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        engineRef.current = new GraphicsEngine(canvasRef.current, canvasManager);
        engineRef.current.repaint();

        const unsubscribe = canvasManager.onUpdate(() => {
            engineRef.current?.repaint();
        });

        return () => unsubscribe();
    }, [canvasManager]);

    return (
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
            <canvas
                ref={canvasRef}
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#0a0a0aff",
                    borderRadius: "4px",
                    display: "block",
                }}
                onMouseDown={(e) =>
                    canvasManager.handleMouseDown(
                        e,
                        activeTool,
                        selectedClass,
                        setSelectedClass
                    )
                }
                onMouseMove={(e) => canvasManager.handleMouseMove(e, activeTool)}
                onMouseUp={(e) => canvasManager.handleMouseUp(e, activeTool)}
                onDoubleClick={(e) =>
                    canvasManager.handleDoubleClick(
                        e,
                        activeTool,
                        setSelectedClass
                    )
                }
            />
        </div>
    );
};

export default Canvas;
