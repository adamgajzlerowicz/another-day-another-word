import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { deleteWord, clearWords, updateWord, addWord } from '../state/reducers/words';
import { setInput, setSelect, clearForm } from '../state/reducers/form';

const noop = () => null;

const Row = ({ ...props }) => {
    chrome.extension.getBackgroundPage().console.log(props);
    return <div>
        dupa
        <Switch checked={true} onChange={noop} aria-label="Active"/>
    </div>;
};

const App = ({
                 updateWord,
                 editWord,
                 deleteWord,
                 clearWords,
                 state: {
                     form: { input, select },
                     words,
                 },
                 setSelect,
                 setInput,
                 submit,
             }) => {

    chrome.extension.getBackgroundPage().console.log(Object.keys(words));
    return <div>
        {Object.keys(words).map((word, index) =>
            <Row key={Math.random} word={index} details={words[word]}/>
        )}
        <form onSubmit={(e) => {
            e.preventDefault();
            input && submit({
                word: input,
                synonyms: [],
                active: true,
                type: select
            });
        }}>
            <TextField
                id="name"
                label="Name"
                className={'input'}
                value={input}
                onChange={setInput}
                margin="normal"
            />
            <FormControl className={'form-control select'}>
                <InputLabel>Type</InputLabel>
                <Select
                    value={select}
                    onChange={setSelect}
                    inputProps={{
                        name: 'type',
                        id: 'type-select',
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
            <Button
                variant={'raised'}
                color={'primary'}
                size="small"
                type={'submit'}
                className={'add_button'}
            >
                Add
            </Button>
        </form>
    </div>;
};

const mapState = state => ({ state });

const mapDispatch = dispatch => ({
    updateWord: word => dispatch(updateWord(word)),
    deleteWord: word => dispatch(deleteWord(word)),
    clearWords: () => dispatch(clearWords()),
    setInput: data => dispatch(setInput(data.target.value)),
    setSelect: data => dispatch(setSelect(data.target.value)),
    submit: data => {
        dispatch(clearForm());
        dispatch(addWord(data));
    }
});

const ConnectedApp = connect(mapState, mapDispatch)(App);

export default ConnectedApp;
