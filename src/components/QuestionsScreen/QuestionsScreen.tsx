/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styles from "./questions.module.css";
import { IQuestions, IResult } from "../../utils/IData.ts";

interface IQuestionsScreenProps {
  questionsData: IQuestions;
  resultReturn: (Res: IResult[]) => void;
}
interface IQuestionsScreenState {
  questionsData: IQuestions;
  currentQuestion: string | undefined;
  scrambledAnswers: { [x: string]: string }[];
  indexQuestion: number;
  numQuestionsTotal: number;
  indexOptionSelected: number | null;
  points: number;
  resultArray: IResult[];
}
export default class QuestionsScreen extends React.Component<IQuestionsScreenProps, IQuestionsScreenState> {
  constructor(props: IQuestionsScreenProps) {
    super(props);
    this.state = {
      questionsData: { questions: [] },
      currentQuestion: "",
      scrambledAnswers: [],
      indexQuestion: 0,
      numQuestionsTotal: this.props.questionsData.questions.length,
      indexOptionSelected: null,
      points: 0,
      resultArray: [],
    };
  }

  private shuffleArray(array: { [x: string]: string }[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private shuffleAnswers(): void {
    let newObj = {
      ...this.props.questionsData.questions[this.state.indexQuestion],
    };
    delete newObj.question;

    let answers = Object.keys(newObj).map((key) => ({ [key]: newObj[key] }));
    this.shuffleArray(answers);
    console.log(answers);
    this.setState(
      {
        scrambledAnswers: answers,
      },
      () => console.log(this.state.scrambledAnswers)
    );
  }

  private setResult(isCorrect: boolean): void {
    let resultArr = this.state.resultArray;
    resultArr.push({
      isCorrect: isCorrect,
      question: this.state.currentQuestion,
    });
    this.setState({
      points: isCorrect ? this.state.points + 1 : this.state.points,
      resultArray: resultArr,
    });
    // if (this.state.indexQuestion + 1 === this.state.numQuestionsTotal) {
    //   this.props.resultReturn(this.state.resultArray);
    // }
  }

  private setQuestion(): void {
    this.setState({
      currentQuestion: this.props.questionsData.questions[this.state.indexQuestion].question,
    });
    this.shuffleAnswers();
  }
  private updateQuestion(): void {
    this.setState(
      {
        indexQuestion: this.state.indexQuestion + 1,
        indexOptionSelected: null,
      },
      () => this.setQuestion()
    );
  }

  componentDidMount(): void {
    console.log("questionsData props", this.props.questionsData);

    this.setQuestion();
  }

  render() {
    return (
      <>
        <div className={styles.Questions}>
          <div className={styles.questionContainer}>
            <div className={styles.questionNumber}>
              Question {this.state.indexQuestion + 1} of {this.state.numQuestionsTotal}
            </div>
            <div className={styles.quizQuestion}>{this.state.currentQuestion}</div>
          </div>

          {this.state.scrambledAnswers.map((answer, index) => {
            const isCorrect = Object.keys(answer)[0] === "answer1";
            const isSelected = this.state.indexOptionSelected === index;
            console.log("isSelected", isSelected);
            console.log("points", this.state.points);
            console.log("result", this.state.resultArray);

            return (
              <button
                className={`${styles.option} 
                ${isSelected && (isCorrect ? styles.correctSelected : styles.wrongSelected)} ${
                  this.state.indexOptionSelected !== null ? (isCorrect ? styles.correctOption : styles.wrongOption) : ""
                }`}
                key={index}
                onClick={() => {
                  console.log("aaaaaa", isCorrect);
                  if (this.state.indexOptionSelected === null) {
                    this.setState({ indexOptionSelected: index });
                    this.setResult(isCorrect);
                  }
                }}>
                <div className={styles.optionLetterContainer}>
                  <div className={styles.optionLetter}>{String.fromCharCode(65 + index)}</div>
                </div>

                <div className={styles.optionTextContainer}>
                  <div className={styles.optionText}>{answer[Object.keys(answer)[0]]}</div>
                </div>
              </button>
            );
          })}

          {/* {this.state.indexQuestion + 1 !== this.state.numQuestionsTotal && ( */}
          <div className={styles.nextButtonArea}>
            <div
              className={this.state.indexOptionSelected !== null ? styles.nextButtonEnable : styles.nextButtonDisable}
              onClick={() => {
                if (this.state.indexOptionSelected !== null) {
                  if (this.state.indexQuestion + 1 !== this.state.numQuestionsTotal) this.updateQuestion();
                  else this.props.resultReturn(this.state.resultArray);
                }
              }}>
              {this.state.indexQuestion + 1 !== this.state.numQuestionsTotal ? (
                <a className={styles.nextButtonLabel}>Próxima pergunta</a>
              ) : (
                <a className={styles.nextButtonLabel}>Resultado</a>
              )}

              <svg
                className={styles.arrowIcon}
                xmlns="http://www.w3.org/2000/svg"
                // height="24px"
                viewBox="0 0 24 24"
                // width="24px"
                // fill="#5a6375"
              >
                <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                <path d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z" />
              </svg>
            </div>
          </div>
          {/* )} */}
        </div>
      </>
    );
  }
}
