import { useMemo } from "react";
import { atom, useAtom } from "jotai";
import "./styles.css";
import {
  NameItemAtom,
  nameAtom,
  surnameAtom,
  prefixAtom,
  filteredNameListAtom,
  createAtom,
  updateAtom,
  deleteAtom,
  selectedItemsAtom
} from "./atoms";

const Filter = () => {
  const [prefix, setPrefix] = useAtom(prefixAtom);
  return (
    <div>
      <span>Filter prefix:</span>
      <input value={prefix} onChange={(e) => setPrefix(e.target.value)} />
    </div>
  );
};

const Item = ({ itemAtom }: { itemAtom: NameItemAtom }) => {
  const [{ name, surname }] = useAtom(itemAtom);
  const [selected, setSelected] = useAtom(
    useMemo(
      () =>
        atom(
          (get) => get(selectedItemsAtom).includes(itemAtom),
          (_get, set) => set(selectedItemsAtom, itemAtom)
        ),
      [itemAtom]
    )
  );
  return (
    <div
      style={{
        padding: "0.1em",
        backgroundColor: selected ? "lightgray" : "transparent"
      }}
      onClick={setSelected}
    >
      {name}, {surname}
    </div>
  );
};

const List = () => {
  const [list] = useAtom(filteredNameListAtom);
  return (
    <div
      style={{
        width: "100%",
        height: "8em",
        overflow: "scroll",
        border: "2px solid gray"
      }}
    >
      {list.map((item) => (
        <Item key={String(item)} itemAtom={item} />
      ))}
    </div>
  );
};

const NameField = () => {
  const [name, setName] = useAtom(nameAtom);
  return (
    <div>
      <span>Name:</span>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

const SurnameField = () => {
  const [surname, setSurname] = useAtom(surnameAtom);
  return (
    <div>
      <span>Surname:</span>
      <input value={surname} onChange={(e) => setSurname(e.target.value)} />
    </div>
  );
};

const CreateButton = () => {
  const [enabled, create] = useAtom(createAtom);
  return (
    <button disabled={!enabled} onClick={create}>
      Create
    </button>
  );
};

const UpdateButton = () => {
  const [enabled, update] = useAtom(updateAtom);
  return (
    <button disabled={!enabled} onClick={update}>
      Update
    </button>
  );
};

const DeleteButton = () => {
  const [enabled, del] = useAtom(deleteAtom);
  return (
    <button disabled={!enabled} onClick={del}>
      Delete
    </button>
  );
};

const App = () => (
  <div className="App">
    <div style={{ display: "flex" }}>
      <div style={{ width: "45%" }}>
        <Filter />
        <List />
      </div>
      <div style={{ width: "45%", margin: "auto" }}>
        <NameField />
        <SurnameField />
      </div>
    </div>
    <CreateButton />
    <UpdateButton />
    <DeleteButton />
  </div>
);

export default App;
