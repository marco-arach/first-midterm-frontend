export class UMLClass {
    id: string;
    x: number;
    y: number;
    name: string;
    attributes: string[];
    width: number;
    height: number;
    type: 'UMLClass' = 'UMLClass';
    selected: boolean = false;

    constructor(id: string, x: number, y: number, name: string, attributes: string[]) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.attributes = attributes;
        this.width = 100;
        this.height = 140;
    }

    isInside(px: number, py: number): boolean {
        return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.font = '14px Arial';
        const nameWidth = ctx.measureText(this.name).width + 20;
        const attrWidths = this.attributes.map(a => ctx.measureText(a).width + 20);
        const requiredWidth = Math.max(nameWidth, ...attrWidths, this.width);
        const requiredHeight = Math.max(40 + this.attributes.length * 20, this.height);

        this.width = requiredWidth;
        this.height = requiredHeight;

        ctx.fillStyle = '#fce6c0ff';
        ctx.strokeStyle = this.selected ? '#3b82f6' : '#000000';
        ctx.lineWidth = this.selected ? 3 : 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x + this.width / 2, this.y + 25);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 35);
        ctx.lineTo(this.x + this.width, this.y + 35);
        ctx.stroke();

        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        let y = this.y + 55;
        for (let attr of this.attributes) {
            ctx.fillText(attr, this.x + 10, y);
            y += 20;
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
    }
}
