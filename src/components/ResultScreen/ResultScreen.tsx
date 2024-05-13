import React from "react";
import styles from "./result.module.css";
import { IResult } from "../../utils/IData";

interface IResultScrennProps {
  resultData: IResult[];
}

export default class ResultScrenn extends React.Component<IResultScrennProps> {
  render() {
    return (
      <>
        <div className={styles.results}>
          <div className={styles.resultTitle}>Resultados</div>
          <div className={styles.questions}>
            {this.props.resultData.map((item, index) => (
              <div
                className={`${styles.resultQuestion} 
            ${item.isCorrect ? styles.correct : styles.incorrect}`}>
                <div className={styles.questionNumberContainer}>
                  <div className={styles.questionNumber}>{index + 1}</div>
                </div>

                <div className={styles.questionTextContainer}>
                  <div className={styles.questionText}>{item.question}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
