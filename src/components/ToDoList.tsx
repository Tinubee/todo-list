import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, localCategory, toDoSelector } from "../atoms";
import CreateToDo, { Button, Form, Input } from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0 20px;
  max-width: 420px;
  margin: 50px auto;
  border: 1px solid white;
  height: 70vh;
  border-radius: 10px;
`;

const CategoryList = styled.select`
  font-size: 22px;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid white;
  background-color: black;
  color: white;
  margin: 10px 0px 5px 0px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
`;

interface IForm {
  addcategory: string;
}

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [add, setAdd] = useState(true);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const newCategoryArr = localCategory;
  const handleValid = ({ addcategory }: IForm) => {
    newCategoryArr.push(addcategory);
    localStorage.setItem("category", JSON.stringify(newCategoryArr));
    setValue("addcategory", "");
    setAdd(!add);
  };

  return (
    <Container>
      <Title>To Dos</Title>
      <hr />
      <Form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("addcategory", {
            required: "Please write a add Category Name",
          })}
          placeholder="Write a to add category..."
        />
        <Button>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Form>
      <CategoryList value={category} onInput={onInput}>
        {localCategory.map((category: any) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </CategoryList>
      <hr />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
