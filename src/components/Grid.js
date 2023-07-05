import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 10px auto;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: insert;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 8px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyweb && "display: none"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({  data }) => toast.error(data));
        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>CNPJ</Th>
                    <Th onlyWeb>Fone</Th>
                    <Th>Endereço</Th>
                    <Th>V. para motos</Th>
                    <Th>V. para carros</Th>
                </Tr>
            </Thead>
            <Tbody>
              {users.map((item, i) => (
                <Tr key={i}>
                    <Td width="20%">{item.nome}</Td>
                    <Td width="20%">{item.cnpj}</Td>
                    <Td width="20%" onlyWeb>
                      {item.fone}
                    </Td>
                    <Td width="20%">{item.endereco}</Td>
                    <Td width="10%">{item.qvm}</Td>
                    <Td width="10%">{item.qvc}</Td>
                    <Td alignCenter width="5%">
                        <FaEdit onClick={() => handleEdit(item)} />
                    </Td>
                    <Td alignCenter width="5%">
                        <FaTrash onClick={() => handleDelete(item.id)} />
                    </Td>
                </Tr>
              ))}
            </Tbody>
        </Table>
    );
};

export default Grid;