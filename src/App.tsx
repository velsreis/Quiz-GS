import React from "react";
import styles from "./App.module.css";
import StartScreen from "./components/startScreen/StartScreen.tsx";
import QuestionsScreen from "./components/QuestionsScreen/QuestionsScreen.tsx";

import { IQuestions } from "./utils/IData.ts";
enum ScreenEnum {
  start,
  questions,
  result,
}

interface IAppState {
  screen: ScreenEnum;
  data: IQuestions;
}

export default class App extends React.Component<{}, IAppState> {
  // data = new URL(import.meta.env.VITE_GS_SCRIPT).toJSON();

  state: IAppState = {
    screen: ScreenEnum.start,
    data: { questions: [] },
  };

  componentDidMount(): void {
    fetch(import.meta.env.VITE_GS_SCRIPT)
      .then((response) => response.json())
      .then((json) =>
        this.setState({ data: json }, () => console.log("json 2", json))
      );
  }

  render() {
    return (
      <div className={styles.App}>
        {this.state.screen === ScreenEnum.start && (
          <StartScreen
            startButton={() => {
              this.setState({ screen: ScreenEnum.questions });
            }}
          />
        )}
        {this.state.screen === ScreenEnum.questions &&
          this.state.data.questions.length > 0 && (
            <QuestionsScreen questionsData={this.state.data} />
          )}
      </div>
    );
  }
}
