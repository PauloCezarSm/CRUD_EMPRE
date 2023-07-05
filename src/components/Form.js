import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputAre = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.cnpj.value = onEdit.cnpj;
      user.fone.value = onEdit.fone;
      user.endereco.value = onEdit.endereco;
      user.qvm.value = onEdit.qvm;
      user.qvc.value = onEdit.qvc;
    }
    
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.cnpj.value ||
      !user.fone.value ||
      !user.endereco.value ||
      !user.qvm.value ||
      !user.qvc.value
    ) {
        return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                cnpj: user.cnpj.value,
                fone: user.fone.value,
                endereco: user.endereco.value,
                qvm: user.qvm.value,
                qvc: user.qvc.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
    } else {
        await axios
          .post("http://localhost:8800", {
            nome: user.nome.value,
            cnpj: user.cnpj.value,
            fone: user.fone.value,
            endereco: user.endereco.value,
            qvm: user.qvm.value,
            qvc: user.qvc.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
    }
    user.nome.value = "";
    user.cnpj.value = "";
    user.fone.value = "";
    user.endereco.value = "";
    user.qvm.value = "";
    user.qvc.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
        <InputAre>
            <Label>Nome</Label>
            <Input name="nome" />
        </InputAre>
        <InputAre>
            <Label>Cnpj</Label>
            <Input name="cnpj" />
        </InputAre>
        <InputAre>
            <Label>Telefone</Label>
            <Input name="fone" />
        </InputAre>
        <InputAre>
            <Label>Endereço</Label>
            <Input name="endereco" />
        </InputAre>
        <InputAre>
            <Label>V. motos</Label>
            <Input name="qvm" />
        </InputAre>
        <InputAre>
            <Label>V. para carros</Label>
            <Input name="qvc" />
        </InputAre>

        <Button type="submit">SALVAR</Button>
    </FormContainer>
  )

}

export default Form;