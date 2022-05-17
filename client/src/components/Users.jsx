import {useForm} from 'react-hook-form';
import {useState} from 'react';

import {userService} from '../services';

export const Users = () => {

    const {reset, handleSubmit, register} = useForm();
    const [message, setMessage] = useState(null);
    const [users, setUsers] = useState(null);
    const [num, setNum] = useState(1);
    let [disable, setDisable] = useState(null);

    const submit = async (user) => {

        let formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('positionId', user.positionId);
        formData.append('photo', user.photo[0]);

        const token = await userService.getToken();
        const accessToken = token.data.token;
        try {
            const response = await userService.create(accessToken, formData);
            setMessage(response.data.message);
            reset()
        } catch (err) {
            setMessage(err.response.data.message) || setMessage(err.response.data.fails.message);
        }

    };

    const showUsers = async () => {
        const response = await userService.getUsersList(num);
        setUsers(response.data.users);

        if (response.data.page === response.data.total_pages) {
            disable = true;
            setDisable(disable);
            setNum(num - 1);
            return;
        }
        setNum(num + 1);
    }

    const showUsersBack = async () => {
        const response = await userService.getUsersList(num);
        setUsers(response.data.users);

        if (response.data.page === 1) {
            disable = false;
            setDisable(disable);
            setNum(num + 1);
            return;
        }
        setNum(num - 1);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>name <input type="text" {...register('name')}/></label></div>
                <div><label>email <input type="text" {...register('email')}/></label></div>
                <div><label>phone <input type="string" {...register('phone')}/></label></div>
                <div><label>position_id <input type="number" {...register('positionId')}/></label></div>
                <div><label>photo <input type="file" {...register('photo')}/></label></div>
                <button>Create</button>
            </form>
            <br/>
            <p style={{color:'darkcyan'}}>{message && message}</p>
            <br/>
            <hr/>
            <p>Показать пользователей - request /users?page={}&count=6</p>
            <button disabled={!disable} onClick={showUsersBack}>Страница назад</button>
            <button disabled={disable} onClick={showUsers}>Страница вперед</button>
            <div style={{display:'flex'}}>{users && users.map(user =>
            <div>
                    <p><b>id:</b> {user.id}</p>
                    <p><b>name:</b> {user.name}</p>
                    <p><b>email:</b> {user.email}</p>
                    <p><b>phone:</b> {user.phone}</p>
                    <p><b>position:</b> {user.position}</p>
                    <p><b>position_id:</b> {user.position_id}</p>
                    <p><b>registration_timestamp:</b> {user.registration_timestamp}</p>,
                    <p><b>photo:</b> {user.photo}</p>
                </div>)}
            </div>
            <hr/>
        </div>
    );
};