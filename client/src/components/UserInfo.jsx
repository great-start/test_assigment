import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {userService} from '../services';

export const UserInfo = () => {

    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function load(id) {
            const response = await userService.getById(id);
            setUser(response.data.user);
        }

        load(id);
    },[])

    return (
        <div>
            {user && <div>
                <p>id: {user.id}</p>
                <p>name: {user.name}</p>
                <p>email: {user.email}</p>
                <p>phone: {user.phone}</p>
                <p>position: {user.position}</p>
                <p>position_id: {user.position_id}</p>
                <p>registration_timestamp: {user.registration_timestamp}</p>,
                <p>photo: {user.photo}</p>
            </div>
            }
        </div>
    );
};
