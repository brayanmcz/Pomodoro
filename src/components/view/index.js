import React, { Component } from 'react';
import { Wrapper } from './style';
import { Timer } from '../Timer'


class View extends Component {
    render () {
        return (
            <Wrapper>
                <Timer/>
            </Wrapper>
        )
    }
}

export { View };