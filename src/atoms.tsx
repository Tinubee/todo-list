import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

let cate = localStorage.getItem("category");
let localCate = JSON.parse(cate as any);
const categories = ["TO DO", "DOING", "DONE"];

export const localCategory = localCate?.length > 0 ? localCate : categories;

export const categoryState = atom<string>({
  key: "category",
  default: localCategory[0],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") || "[]"),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
