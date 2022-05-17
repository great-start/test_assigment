import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {userService} from '../services';

export const Users = () => {

    const {reset, handleSubmit, register} = useForm();
    const [message, setMessage] = useState(null);
    const [users, setUsers] = useState(null);
    const [page, setPage] = useState(1);

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
        } catch (err) {
            setMessage(err.response.data.message);
        }

        reset()
    };

    const showUsers = async () => {
        const response = await userService.getUsersList(page);
        setPage(page + 1);
        setUsers(response.data.users);
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
            <p>{message && message}</p>
            <br/>
            <button onClick={showUsers}>Показать еще</button>
            <div style={{display:'flex'}}>{users && users.map(user =>
            <div>
                    <p>id: {user.id}</p>
                    <p>name: {user.name}</p>
                    <p>email: {user.email}</p>
                    <p>phone: {user.phone}</p>
                    <p>position: {user.position}</p>
                    <p>position_id: {user.position_id}</p>
                    <p>registration_timestamp: {user.registration_timestamp}</p>,
                    <p>photo: {user.photo}</p>
                </div>)}
            </div>
        </div>
    );
};