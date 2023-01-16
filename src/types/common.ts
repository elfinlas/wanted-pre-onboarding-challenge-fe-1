type ValueType = string | number | boolean;

export type MultiTyper<
    T extends {[k: string]: ValueType} | ReadonlyArray<ValueType>,
> = T extends ReadonlyArray<ValueType>
    ? T[number]
    : T extends {[k: string]: infer U}
    ? U
    : never;

export interface NumObjType {
    [key: number]: number;
}
