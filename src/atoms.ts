import { atom, PrimitiveAtom } from "jotai";

export const nameAtom = atom("");
export const surnameAtom = atom("");

type NameItem = { name: string; surname: string };
export type NameItemAtom = PrimitiveAtom<NameItem>;

const nameListAtom = atom<NameItemAtom[]>([]);

const baseSelectedItemsAtom = atom<NameItemAtom[]>([]);
export const selectedItemsAtom = atom(
  (get) => get(baseSelectedItemsAtom),
  (get, set, nameItemAtom: NameItemAtom) => {
    const baseSelectedItems = get(baseSelectedItemsAtom);
    if (baseSelectedItems.includes(nameItemAtom)) {
      set(baseSelectedItemsAtom, (prev) =>
        prev.filter((item) => item !== nameItemAtom)
      );
    } else {
      set(baseSelectedItemsAtom, (prev) => [...prev, nameItemAtom]);
    }
  }
);

export const prefixAtom = atom("");

export const filteredNameListAtom = atom((get) => {
  const prefix = get(prefixAtom);
  const nameList = get(nameListAtom);
  if (!prefix) {
    return nameList;
  }
  return nameList.filter((nameItemAtom) =>
    get(nameItemAtom).surname.startsWith(prefix)
  );
});

export const createAtom = atom(
  (get) => !!get(nameAtom) && !!get(surnameAtom),
  (get, set) => {
    const name = get(nameAtom);
    const surname = get(surnameAtom);
    if (name && surname) {
      const nameItemAtom: NameItemAtom = atom({ name, surname });
      set(nameListAtom, (prev) => [...prev, nameItemAtom]);
      set(nameAtom, "");
      set(surnameAtom, "");
    }
  }
);

export const updateAtom = atom(
  (get) =>
    !!get(nameAtom) && !!get(surnameAtom) && !!get(selectedItemsAtom).length,
  (get, set) => {
    const name = get(nameAtom);
    const surname = get(surnameAtom);
    const selectedItems = get(selectedItemsAtom);
    if (name && surname) {
      selectedItems.forEach((item) => set(item, { name, surname }));
    }
  }
);

export const deleteAtom = atom(
  (get) => !!get(selectedItemsAtom).length,
  (get, set) => {
    const selectedItems = get(selectedItemsAtom);
    if (selectedItems) {
      set(nameListAtom, (prev) =>
        prev.filter((item) => !selectedItems.includes(item))
      );
    }
  }
);
