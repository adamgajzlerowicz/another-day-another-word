import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { deleteWord, clearWords, updateWord, addWord } from '../state/reducers/words';
import { setInput, setSelect, clearForm } from '../state/reducers/form';

const Row = ({ word: { word, type, synonyms, active }, toggleEnabled, deleteWord }) => {
    return <div style={{ float: 'left', width: '100%' }}>
        {word}{type !== 'any' && ': ' + type}
        <div style={{ float: 'right' }}>
            Active:
            <Switch checked={active} onChange={toggleEnabled} aria-label="Active"/>
            <IconButton aria-label="Delete" onClick={deleteWord}>
                <DeleteIcon/>
            </IconButton>
        </div>
        <br/>{synonyms.join(', ')}
    </div>;
};

const App = ({
                 updateWord,
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

    return <div>
        {Object.keys(words).map((word) =>
            <Row
                key={Math.random()}
                word={words[word]}
                toggleEnabled={() => updateWord({ ...words[word], active: !words[word].active })}
                deleteWord={() => deleteWord(words[word].word)}
            />
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
                    displayEmpty={true}
                >
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
