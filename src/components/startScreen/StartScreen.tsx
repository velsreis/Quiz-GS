import React from "react";
import styles from "./start.module.css";

interface IStartScreeenProps {
  startButton: () => void;
}

export default class StartScreen extends React.Component<IStartScreeenProps> {
  render() {
    return (
      <>
        <div className={styles.start}>
          <div className={styles.startHeader}>
            <a className={styles.startTitle}>MEGA QUIZ</a>
            <a className={styles.startDescription}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
              repellat voluptatibus perspiciatis similique nam tempore, optio
              quis cumque illum, vel qui voluptatum ipsa, porro facere id
              distinctio totam numquam quibusdam!
            </a>
          </div>

          <div
            className={styles.startButton}
            onClick={() => {
              this.props.startButton();
            }}
          >
            START
          </div>
        </div>
      </>
    );
  }
}
