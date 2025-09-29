import { CanvasManager } from "../managers/CanvasManager";
import { UMLClass } from "../models/UMLClass";
import { UMLRelationship } from "../models/UMLRelationship";

export class GraphicsEngine {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private manager: CanvasManager;

    constructor(canvas: HTMLCanvasElement, manager: CanvasManager) {
        this.canvas = canvas;
        this.manager = manager;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("No se pudo obtener contexto 2D del canvas");
        this.ctx = ctx;
    }

    repaint() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const objects = this.manager.getObjetos();
        const classes = objects.filter((o) => o.type === "UMLClass") as UMLClass[];
        const rels = objects.filter((o) => o.type === "UMLRelationship") as UMLRelationship[];

        rels.forEach((r) => r.draw(ctx, classes));
        classes.forEach((c) => c.draw(ctx));

        const tempLine = this.manager.getTempLine();
        if (tempLine) {
            ctx.strokeStyle = "#facc15";
            ctx.beginPath();
            ctx.moveTo(tempLine.from.x, tempLine.from.y);
            ctx.lineTo(tempLine.to.x, tempLine.to.y);
            ctx.stroke();
        }
    }
}
