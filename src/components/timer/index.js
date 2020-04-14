import React, { Component } from 'react';
import { Wrapper } from './style';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class Timer extends Component {

    static defaultProps = {
        minutesToCountDown: 1,
        secondsToCountDown: 30
    }

    state = {
        minutesLeft: 0,
        secondsLeft: 0,
        endTime: null,
        timerActive: false,
        // focusTime: null //used for seeing focus vs break
    }

    componentDidMount = () => {
        this.setState({
            minutesLeft: this.props.minutesToCountDown,
            secondsLeft: this.props.secondsToCountDown
        })
    }

    setTime = (mins, secs) => {
        this.setState({
            minutesLeft: mins, secondsLeft: secs
        })
    }

    setEndTime = () => {
        const now = new Date().getTime();
        const millisecondsRemaining = (this.props.minutesToCountDown*60*1000) + (this.props.secondsToCountDown * 1000);

        this.setState({
            endTime: now + millisecondsRemaining
        })

        return (now + millisecondsRemaining);
    }

    getSecondsRemaining = (milliseconds) => {
        return (Math.floor((milliseconds % (1000 * 60)) / 1000));
    }

    getMinutesRemainging = (milliseconds) => {
        return (Math.floor(milliseconds / 1000 / 60));
    }

    getRemainingTime = () => {
        const now = new Date().getTime();
        const end = this.state.endTime;
        return (end - now + 1000);
    }

    setActive = () => {
        this.setState({
            timerActive: true
        })
    }

    setUnactive = () => {
        this.setState({
            timerActive: false
        })
    }

    stopTimer = (timer) => {
        this.setUnactive();
        console.log("ALL DONE");
        clearInterval(timer);
    }

    startTimer = () => {
        if (!this.state.timerActive){
            this.setActive();
            this.setEndTime();
            
            const timer = setInterval(() => {
                const delta = this.getRemainingTime();
                const mins = this.getMinutesRemainging(delta);
                const secs = this.getSecondsRemaining(delta);
                this.setTime(mins, secs)
    
                if(!mins && !secs){
                    this.stopTimer(timer);
                }
            }, 100)
        }
    }

    render() {
        return (
            <Wrapper>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol size="lg">
                            <h3 className="text-center text-white period mt-5 ">
                                Focus
                            </h3>
                            <h1 className="text-center text-white time mt-5">
                                {this.state.minutesLeft.toString().padStart(2, '0')}:{this.state.secondsLeft.toString().padStart(2, '0')}
                            </h1>
                        </MDBCol>
                        <MDBCol size="lg">
                            <div className="text-center">
                                <MDBBtn className="btn-circle btn-dark mt-5 mb-5" onClick={this.startTimer}>
                                    Start
                                </MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Wrapper>
        )
    }
}

export { Timer };