import { BUILDER_CHARACTERS } from "../constants";

export function addEmptySpace(data: string): string {
    return data+= BUILDER_CHARACTERS.EMPTY_SPACE;
}