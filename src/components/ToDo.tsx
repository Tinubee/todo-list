import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, localCategory, toDoState } from "../atoms";

const ToDoText = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

const Button = styled.button<{ delete: boolean }>`
  font-size: 16px;
  background-color: ${(props) => (props.delete ? "red" : "aqua")};
  color: ${(props) => (props.delete ? "white" : "black")};
  border-radius: 5px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ToDoList = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = {
        text,
        id,
        category: event as any,
      };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteClick = () => {
    setToDos((arr) => {
      return arr.filter((data) => data.id !== id);
    });
  };

  return (
    <ToDoList>
      <BtnContainer>
        <ToDoText>⭐️ {text}</ToDoText>
        {localCategory.map(
          (categoryItem: any) =>
            category !== categoryItem && (
              <Button
                key={categoryItem}
                delete={false}
                name={categoryItem}
                onClick={() => onClick(categoryItem)}
              >
                {categoryItem}
              </Button>
            )
        )}
        <Button onClick={deleteClick} delete={true}>
          Delete
        </Button>
      </BtnContainer>
    </ToDoList>
  );
}
export default ToDo;
