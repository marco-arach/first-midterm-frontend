import { UMLClass } from "../models/UMLClass";
import { UMLRelationship } from "../models/UMLRelationship";

type UpdateCallback = () => void;

export class CanvasManager {
    private objetos: (UMLClass | UMLRelationship)[] = [];
    private callbacks: UpdateCallback[] = [];
    private isDragging = false;
    private dragClass: UMLClass | null = null;
    private offset = { x: 0, y: 0 };
    private tempLine: { from: { x: number; y: number }, to: { x: number; y: number } } | null = null;
    private relationshipStart: UMLClass | null = null;

    constructor() {
    }

    getObjetos() {
        return this.objetos;
    }

    onUpdate(cb: UpdateCallback) {
        this.callbacks.push(cb);
        return () => {
            this.callbacks = this.callbacks.filter(c => c !== cb);
        };
    }

    private notify() {
        this.callbacks.forEach(cb => cb());
    }


    actualizarClase(updatedClass: UMLClass) {
        this.objetos = this.objetos.map(o => (o.id === updatedClass.id ? updatedClass : o));
        this.notify();
    }

    handleMouseDown(
        e: React.MouseEvent,
        activeTool: string,
        selectedClass: UMLClass | null,
        setSelectedClass: Function
    ) {
        const pos = this.getMousePos(e);
        const clicked = this.findClassAt(pos.x, pos.y);

        if (activeTool === "select" && clicked) {
            if (selectedClass) return;
            this.dragClass = clicked;
            this.isDragging = true;
            this.offset = { x: pos.x - clicked.x, y: pos.y - clicked.y };
        } else if (activeTool === "class") {
            const newClass = new UMLClass("_" + Math.random().toString(36).substr(2, 9), pos.x - 75, pos.y - 50, "NewClass", ["attribute1"]);
            this.objetos.push(newClass);
            setSelectedClass(newClass);
            this.notify();
        } else if (["one_to_one", "one_to_many", "many_to_one", "many_to_many", "inheritance", "composition", "aggregation"].includes(activeTool) && clicked) {
            this.relationshipStart = clicked;
            this.tempLine = { from: { x: pos.x, y: pos.y }, to: { x: pos.x, y: pos.y } };
            this.notify();
        } else if (activeTool === "delete") {
            if (clicked) {
                this.objetos = this.objetos.filter(
                    o =>
                        o.id !== clicked.id &&
                        !(o.type === "UMLRelationship" &&
                            ((o as UMLRelationship).from === clicked.id || (o as UMLRelationship).to === clicked.id))
                );
                this.notify();
            } else {
                const rel = this.objetos.find(
                    o => o.type === "UMLRelationship" && this.isRelationshipClicked(o as UMLRelationship, { x: pos.x, y: pos.y })
                ) as UMLRelationship | undefined;

                if (rel) {
                    this.objetos = this.objetos.filter(o => o.id !== rel.id);
                    this.notify();
                }
            }
        }
    }

    handleMouseMove(e: React.MouseEvent, activeTool: string) {
        const pos = this.getMousePos(e);

        if (activeTool === "select" && this.isDragging && this.dragClass) {
            this.dragClass.x = pos.x - this.offset.x;
            this.dragClass.y = pos.y - this.offset.y;
            this.notify();
        }

        if (this.relationshipStart && this.tempLine) {
            this.tempLine.to = { x: pos.x, y: pos.y };
            this.notify();
        }
    }

    handleMouseUp(e: React.MouseEvent, activeTool: string) {
        if (activeTool === "select") {
            this.isDragging = false;
            this.dragClass = null;
        }

        if (this.relationshipStart) {
            const pos = this.getMousePos(e);
            const endClass = this.findClassAt(pos.x, pos.y);
            if (endClass && endClass.id !== this.relationshipStart.id) {
                const newRel = new UMLRelationship("_" + Math.random().toString(36).substr(2, 9), this.relationshipStart.id, endClass.id, activeTool);
                this.objetos.push(newRel);
            }
            this.relationshipStart = null;
            this.tempLine = null;
            this.notify();
        }
    }

    handleDoubleClick(e: React.MouseEvent, activeTool: string, setSelectedClass: Function) {
        if (activeTool !== "select") return;
        const pos = this.getMousePos(e);
        const clicked = this.findClassAt(pos.x, pos.y);
        if (clicked) {
            setSelectedClass(clicked);
        }
    }

    private getMousePos(e: React.MouseEvent) {
        const target = e.currentTarget as HTMLCanvasElement;
        const rect = target.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    private findClassAt(x: number, y: number) {
        return [...this.objetos]
            .reverse()
            .find((o) => o.type === "UMLClass" && (o as UMLClass).isInside(x, y)) as UMLClass | undefined;
    }

    private isRelationshipClicked(rel: UMLRelationship, pos: { x: number; y: number }) {
        const threshold = 10;
        const fromCls = this.objetos.find(o => o.id === rel.from) as UMLClass;
        const toCls = this.objetos.find(o => o.id === rel.to) as UMLClass;
        if (!fromCls || !toCls) return false;

        const fromPoint = { x: fromCls.x + fromCls.width / 2, y: fromCls.y + fromCls.height / 2 };
        const toPoint = { x: toCls.x + toCls.width / 2, y: toCls.y + toCls.height / 2 };

        const l2 = (toPoint.x - fromPoint.x) ** 2 + (toPoint.y - fromPoint.y) ** 2;
        if (l2 === 0) return false;
        let t = ((pos.x - fromPoint.x) * (toPoint.x - fromPoint.x) + (pos.y - fromPoint.y) * (toPoint.y - fromPoint.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        const projection = { x: fromPoint.x + t * (toPoint.x - fromPoint.x), y: fromPoint.y + t * (toPoint.y - fromPoint.y) };
        const dist = Math.sqrt((pos.x - projection.x) ** 2 + (pos.y - projection.y) ** 2);
        return dist < threshold;
    }

    private deserialize(obj: any): UMLClass | UMLRelationship {
        if (obj.type === "UMLClass") {
            const cls = new UMLClass(obj.id, obj.x, obj.y, obj.name, obj.attributes);
            cls.width = obj.width;
            cls.height = obj.height;
            return cls;
        } else if (obj.type === "UMLRelationship") {
            return new UMLRelationship(obj.id, obj.from, obj.to, obj.relationType);
        }
        return obj;
    }

    getTempLine() {
        return this.tempLine;
    }

    public agregarObjetos(objetos: (UMLClass | UMLRelationship)[]) {
        let addedCount = 0;
        objetos.forEach(obj => {
            const exists = this.objetos.some(o => o.id === obj.id);
            if (!exists) {
                const deserialized = this.deserialize(obj);
                this.objetos.push(deserialized);
                addedCount++;
            }
        });
        this.notify();
        return addedCount;
    }


}
