import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl  } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';


const noop = () => null;

const Hello = () => {
    return <div>
        <Switch checked={true} onChange={noop} aria-label="Active"/>

        <br/>
        <TextField
            id="name"
            label="Name"
            className={'input'}
            value={'dupa'}
            onChange={noop}
            margin="normal"
        />
        <FormControl className={'form-control'}>
            <InputLabel>Type</InputLabel>
            <Select
                value={'any'}
                onChange={noop}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'any'}>Any</MenuItem>
                <MenuItem value={'adjective'}>Adjective</MenuItem>
                <MenuItem value={'noun'}>Noun</MenuItem>
                <MenuItem value={'verb'}>Verb</MenuItem>
            </Select>
        </FormControl>
        <br/>
        <Button variant={'raised'} color={'primary'}>Add</Button>
    </div>;
};

const ConnectedHello = connect(state => ({ state }))(Hello);

export default ConnectedHello;
