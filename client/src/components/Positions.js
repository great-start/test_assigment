import React, {useEffect, useState} from 'react';

import {userService} from '../services';

const Positions = () => {

    const [positions, setPositions] = useState(null);

    useEffect(() => {

        async function load() {
            const response = await userService.positions();
            setPositions(response.data.positions);
        }

        load();
    },[])

    return (
        <div>
            {positions && positions.map(position => <p>{position.id} {position.name}</p> )}
        </div>
    );
};

export default Positions;