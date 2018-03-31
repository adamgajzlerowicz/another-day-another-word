import React from 'react';
import { connect } from 'react-redux';

const Hello = () => {
    return <div>dupa</div>;
};

const ConnectedHello = connect(state => ({ state }))(Hello);

export default ConnectedHello;
