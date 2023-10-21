export default class Guard {

    public static isNullOrWhiteSpace(value: string): boolean {
        if ((value === null) || (value === undefined)) return true;
        if (value.trim() === "") return true;
        return false;
    }

    public static greatherThan(value : string, constraintSize: number) : boolean {
        return value.length > 32
    }

}