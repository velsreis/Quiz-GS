import React from "react";
import "./App.css";
import StartScreen from "./startScreen/StartScreen.tsx";
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
    // this.setState({data: ''})
    fetch(import.meta.env.VITE_GS_SCRIPT)
      .then((response) => response.json())
      .then((json) => this.setState({ data: json }));
  }

  render() {
    return (
      <>
        <StartScreen
          startButton={() => {
            console.log(this.state.data);
            console.log("teste");
          }}
        />
      </>
    );
  }
}
