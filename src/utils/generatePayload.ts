
export function generatePayload(objetos: any[]) {
    const classes = objetos.filter(obj => obj.type === "UMLClass");
    const relationships = objetos.filter(obj => obj.type === "UMLRelationship");

    return {
        classes: classes.map(cls => ({
            id: cls.id,
            name: cls.name,
            attributes: cls.attributes.map((attrStr: string) => {
                const parts = attrStr.split(":").map(s => s.trim());
                return parts.length > 1
                    ? { name: parts[0], type: parts[1] }
                    : { name: parts[0], type: "String" };
            })
        })),
        relationships: relationships.map(rel => ({
            id: rel.id,
            sourceId: rel.from,
            targetId: rel.to,
            type: rel.relationType
        }))
    };
}
