import React from "react";

interface IStartScreeenProps {
  startButton: () => void;
}

export default class StartScreen extends React.Component<IStartScreeenProps> {
  render() {
    return (
      <>
        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            repellat voluptatibus perspiciatis similique nam tempore, optio quis
            cumque illum, vel qui voluptatum ipsa, porro facere id distinctio
            totam numquam quibusdam!
          </p>
          <button
            onClick={() => {
              this.props.startButton();
            }}
          >
            start
          </button>
        </div>
      </>
    );
  }
}
