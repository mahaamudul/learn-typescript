type GenericArray<T> = Array<T>;

type GenericCoordinates<X,Y>=[X,Y];//generic tuple type

const numberArray: GenericArray<number> = [1, 2, 3, 4, 5];
const stringArray: GenericArray<string> = ["apple", "banana", "cherry"];
const coordinates1: GenericCoordinates<number, number> = [10, 20];
const coordinates2: GenericCoordinates<string, string> = ["latitude", "longitude"];
