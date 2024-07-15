import React from 'react';
import { useParams } from 'react-router-dom';

function UpdateOrder() {
    const { id } = useParams();
    console.log(id, "hello");

    return (
        <>
            <h1>Update Order {id}</h1>
        </>
    );
}

export default UpdateOrder;
