import {useForm} from 'react-hook-form';
import {useRef, useState} from 'react';
import {userService} from '../services';

export const Users = () => {

    const {reset, handleSubmit, register} = useForm();
    const [user, setUser] = useState(null);
    const emailInput = useRef();

    const submit = async (user) => {
        console.log(user);
        let formData = new FormData();
        formData.append('name', user.name);
        console.log(user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);
        formData.append('position_id', user.position_id);
        formData.append('photo', user.photo[0]);
        console.log(user.photo);
        console.log(formData);
        const token = await userService.getToken();
        const accessToken = token.data.token;
        await userService.create(accessToken, formData);
        reset()
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>name<input type="text" {...register('name')}/></label></div>
                <div><label>email<input type="text" {...register('email')}/></label></div>
                <div><label>phone<input type="string" {...register('phone')}/></label></div>
                <div><label>position_id<input type="number" {...register('position_id')}/></label></div>
                <div><label>photo<input type="file" {...register('photo')}/></label></div>
                <button>Create</button>
            </form>

        </div>
    );
};