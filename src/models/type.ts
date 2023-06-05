export interface Type {
    name: string
    url: string
}

export interface TypeRelations {
    damage_relations: DamageRelations
}

export interface DamageRelations {
    double_damage_to: Type[]
    double_damage_from: Type[]
}

export default Type