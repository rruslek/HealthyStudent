import React, { useState } from 'react';
import { Paper, Checkbox } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Task = ({task}) => {
    const [checked, setChecked] = useState(false);
    
    if (!task) {
        return null;
    }
    const {id, name, creator, user , deadline, status} = task;
    
    
    const handleChange = (event) => {
        setChecked(event.target.checked);
      };

    return (
        <Item elevation="14" sx={{ backgroundColor: 'lightGreen', textAlign: 'center' }}>
            <Checkbox
                color="success"
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            <strong>{name}</strong>
            {deadline}
            {creator}
        </Item>
    );
}

export { Task };