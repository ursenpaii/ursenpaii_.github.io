class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    return minutes + ':' + seconds;
  }
  render() {
    const { time } = this.props;
    return (
      React.createElement("div", { className: "displayedTime" },
      React.createElement("h1", null, this.format(time))));


  }}


class Input extends React.Component {

  onSubmit(event) {
    event.preventDefault();
    const strSeconds = this.refs.seconds.value;
    if (strSeconds.match(/[0-9]/)) {
      this.refs.seconds.value = '';
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  }

  render() {
    return (
      React.createElement("form", { ref: "form", onSubmit: this.onSubmit.bind(this) },
      React.createElement("input", { type: "text", ref: "seconds", placeholder: "enter time in seconds" }),
      React.createElement("input", { type: "submit", value: "Start" })));


  }}


class Button extends React.Component {
  render() {
    return (
      React.createElement("button", { onClick: this.props.onClickHandler }, this.props.label));

  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false };

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();}

    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
      { count: newCount >= 0 ? newCount : 0 });

    }, 1000);
  }

  handleStop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState(
      { running: false });

    }
  }

  handleReset() {
    this.setState(
    { count: 0 });

  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true });

  }

  render() {
    const { count } = this.state;
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Clock, { time: count }),
      React.createElement(Input, { onSetCountdown: this.handleCountdown.bind(this) }),
      React.createElement(Button, { label: "stop", onClickHandler: this.handleStop.bind(this) }),
      React.createElement(Button, { label: "reset", onClickHandler: this.handleReset.bind(this) })));


  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('app'));