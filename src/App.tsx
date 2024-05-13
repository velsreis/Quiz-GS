/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./App.module.css";
import StartScreen from "./components/startScreen/StartScreen.tsx";
import QuestionsScreen from "./components/QuestionsScreen/QuestionsScreen.tsx";
import ResultScrenn from "./components/ResultScreen/ResultScreen.tsx";

import CircularProgress from "@mui/material/CircularProgress";

import { IQuestions, IResult } from "./utils/IData.ts";

enum ScreenEnum {
  start,
  loading,
  questions,
  result,
}

interface IAppState {
  screen: ScreenEnum;
  data: IQuestions;
  Loaded: boolean;
  resultData: IResult[];
}

export default class App extends React.Component<{}, IAppState> {
  // data = new URL(import.meta.env.VITE_GS_SCRIPT).toJSON();

  state: IAppState = {
    screen: ScreenEnum.start,
    data: { questions: [] },
    Loaded: false,
    resultData: [],
  };

  componentDidMount(): void {
    fetch(import.meta.env.VITE_GS_SCRIPT)
      .then((response) => response.json())
      .then((json) =>
        this.setState(
          { data: json, Loaded: true },
          () => this.state.screen === ScreenEnum.loading && this.setState({ screen: ScreenEnum.questions })
        )
      );
  }

  startBtn(): void {
    if (this.state.Loaded) this.setState({ screen: ScreenEnum.questions });
    else this.setState({ screen: ScreenEnum.loading });
  }

  render() {
    return (
      <div className={styles.App}>
        {this.state.screen === ScreenEnum.start && (
          <StartScreen
            startButton={() => {
              this.startBtn();
            }}
          />
        )}

        {this.state.screen === ScreenEnum.loading && (
          <div className={styles.loading}>
            <React.Fragment>
              <svg width={0} height={0}>
                <defs>
                  <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e01cd5" />
                    <stop offset="100%" stopColor="#1CB5E0" />
                  </linearGradient>
                </defs>
              </svg>
              <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} size={80} />
            </React.Fragment>
          </div>
        )}

        {this.state.screen === ScreenEnum.questions && this.state.data.questions.length > 0 && (
          <QuestionsScreen
            questionsData={this.state.data}
            resultReturn={(res: IResult[]) =>
              this.setState({ resultData: res, screen: ScreenEnum.result }, () => console.log("AAAAAAAAAAAAAAA", res))
            }
          />
        )}

        {this.state.screen === ScreenEnum.result && <ResultScrenn resultData={this.state.resultData} />}
      </div>
    );
  }
}
