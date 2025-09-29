import { UMLClass } from './UMLClass';

export class UMLRelationship {
    id: string;
    from: string;
    to: string;
    relationType: string;
    type: 'UMLRelationship' = 'UMLRelationship';

    constructor(id: string, from: string, to: string, relationType: string) {
        this.id = id;
        this.from = from;
        this.to = to;
        this.relationType = relationType;
    }

    draw(ctx: CanvasRenderingContext2D, classes: UMLClass[]) {
        const fromClass = classes.find(c => c.id === this.from);
        const toClass = classes.find(c => c.id === this.to);
        if (!fromClass || !toClass) return;

        const startX = fromClass.x + fromClass.width / 2;
        const startY = fromClass.y + fromClass.height / 2;
        const endX = toClass.x + toClass.width / 2;
        const endY = toClass.y + toClass.height / 2;

        const dx = endX - startX;
        const dy = endY - startY;
        const angle = Math.atan2(dy, dx);

        const halfWFrom = fromClass.width / 2;
        const halfHFrom = fromClass.height / 2;
        const halfWTo = toClass.width / 2;
        const halfHTo = toClass.height / 2;

        let fromEdgeX = startX;
        let fromEdgeY = startY;
        let toEdgeX = endX;
        let toEdgeY = endY;

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (absDx / halfWFrom > absDy / halfHFrom) {
            fromEdgeX = startX + Math.sign(dx) * halfWFrom;
            fromEdgeY = startY + (halfWFrom * dy / dx) * Math.sign(dx);
        } else {
            fromEdgeY = startY + Math.sign(dy) * halfHFrom;
            fromEdgeX = startX + (halfHFrom * dx / dy) * Math.sign(dy);
        }

        if (absDx / halfWTo > absDy / halfHTo) {
            toEdgeX = endX - Math.sign(dx) * halfWTo;
            toEdgeY = endY - (halfWTo * dy / dx) * Math.sign(dx);
        } else {
            toEdgeY = endY - Math.sign(dy) * halfHTo;
            toEdgeX = endX - (halfHTo * dx / dy) * Math.sign(dy);
        }

        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 2;

        switch (this.relationType) {
            case 'one_to_one':
            case 'one_to_many':
            case 'many_to_one':
            case 'many_to_many':
                ctx.beginPath();
                ctx.moveTo(fromEdgeX, fromEdgeY);
                ctx.lineTo(toEdgeX, toEdgeY);
                ctx.stroke();

                let textFrom = '';
                let textTo = '';
                switch (this.relationType) {
                    case 'one_to_one':
                        textFrom = '1'; textTo = '1'; break;
                    case 'one_to_many':
                        textFrom = '1'; textTo = '1..*'; break;
                    case 'many_to_one':
                        textFrom = '1..*'; textTo = '1'; break;
                    case 'many_to_many':
                        textFrom = '0..*'; textTo = '0..*'; break;
                }

                ctx.fillStyle = '#10b981';
                ctx.font = '12px sans-serif';

                const offset = 20;
                const textFromX = fromEdgeX + Math.cos(angle) * offset;
                const textFromY = fromEdgeY + Math.sin(angle) * offset - 5;
                const textToX = toEdgeX - Math.cos(angle) * offset;
                const textToY = toEdgeY - Math.sin(angle) * offset - 5;

                ctx.fillText(textFrom, textFromX, textFromY);
                ctx.fillText(textTo, textToX, textToY);
                break;

            case 'inheritance':
                ctx.beginPath();
                ctx.moveTo(fromEdgeX, fromEdgeY);
                ctx.lineTo(toEdgeX, toEdgeY);
                ctx.stroke();

                const arrowSize = 12;
                ctx.beginPath();
                ctx.moveTo(toEdgeX, toEdgeY);
                ctx.lineTo(
                    toEdgeX - arrowSize * Math.cos(angle - Math.PI / 6),
                    toEdgeY - arrowSize * Math.sin(angle - Math.PI / 6)
                );
                ctx.lineTo(
                    toEdgeX - arrowSize * Math.cos(angle + Math.PI / 6),
                    toEdgeY - arrowSize * Math.sin(angle + Math.PI / 6)
                );
                ctx.closePath();
                ctx.fillStyle = 'white';
                ctx.fill();
                ctx.stroke();
                break;

            case 'composition':
                ctx.beginPath();
                ctx.moveTo(fromEdgeX, fromEdgeY);
                ctx.lineTo(toEdgeX, toEdgeY);
                ctx.stroke();

                const diamondLength = 16;
                const diamondWidth = 12;
                const tipX = toEdgeX;
                const tipY = toEdgeY;
                const baseX = tipX - diamondLength * Math.cos(angle);
                const baseY = tipY - diamondLength * Math.sin(angle);
                const leftX = (tipX + baseX) / 2 - (diamondWidth / 2) * Math.sin(angle);
                const leftY = (tipY + baseY) / 2 + (diamondWidth / 2) * Math.cos(angle);
                const rightX = (tipX + baseX) / 2 + (diamondWidth / 2) * Math.sin(angle);
                const rightY = (tipY + baseY) / 2 - (diamondWidth / 2) * Math.cos(angle);

                ctx.beginPath();
                ctx.moveTo(tipX, tipY);
                ctx.lineTo(leftX, leftY);
                ctx.lineTo(baseX, baseY);
                ctx.lineTo(rightX, rightY);
                ctx.closePath();
                ctx.fillStyle = '#60a5fa';
                ctx.fill();
                ctx.stroke();
                break;

            case 'aggregation':
                const diamondLengthA = 16;
                const diamondWidthA = 12;

                const tipXA = toEdgeX;
                const tipYA = toEdgeY;

                const baseXA = tipXA - diamondLengthA * Math.cos(angle);
                const baseYA = tipYA - diamondLengthA * Math.sin(angle);

                const leftXA = (tipXA + baseXA) / 2 - (diamondWidthA / 2) * Math.sin(angle);
                const leftYA = (tipYA + baseYA) / 2 + (diamondWidthA / 2) * Math.cos(angle);
                const rightXA = (tipXA + baseXA) / 2 + (diamondWidthA / 2) * Math.sin(angle);
                const rightYA = (tipYA + baseYA) / 2 - (diamondWidthA / 2) * Math.cos(angle);

                ctx.beginPath();
                ctx.moveTo(fromEdgeX, fromEdgeY);
                ctx.lineTo(baseXA, baseYA);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(tipXA, tipYA);
                ctx.lineTo(leftXA, leftYA);
                ctx.lineTo(baseXA, baseYA);
                ctx.lineTo(rightXA, rightYA);
                ctx.closePath();
                ctx.stroke();
                break;

        }
    }
}
