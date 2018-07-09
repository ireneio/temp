import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import moment from 'moment';
import { enhancer } from 'layout';

import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';

import RadioIcon from 'react-icons/lib/md/radio-button-unchecked';
import ArrowUpIcon from 'react-icons/lib/md/keyboard-arrow-up';
import ArrowDownIcon from 'react-icons/lib/md/keyboard-arrow-down';

import * as styles from './styles/qa';
import * as LOCALE from './locale';

@enhancer
@radium
export default class QA extends React.PureComponent {
  static propTypes = {
    qa: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
        question: PropTypes.string.isRequired,
        createdOn: PropTypes.number.isRequired,
        createdBy: ID_TYPE.isRequired,
      }),
    ).isRequired,

    /** props from DecoratorsRoot */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
  };

  state = {
    showReply: false,
  };

  toggleShowReply = () => {
    this.setState({
      showReply: !this.state.showReply,
    });
  };

  render() {
    const { showReply } = this.state;
    const { qa, colors, transformLocale } = this.props;
    const { question, createdOn } = qa[0];

    return (
      <div style={styles.root}>
        <div style={styles.question}>
          <RadioIcon style={styles.radioIcon} />
          <span style={styles.questionText}>{question}</span>
          <span style={styles.questionDate}>
            {moment.unix(createdOn).format('YYYY/MM/DD h:mm a')}
          </span>
        </div>
        <div style={styles.answer}>
          <div style={styles.checkReply(colors)} onClick={this.toggleShowReply}>
            <span style={styles.mobileQuestionDate}>
              {moment.unix(createdOn).format('YYYY/MM/DD h:mm a')}
            </span>
            {qa.length > 1 && (
              <div>
                <span style={styles.mobileCheckReplyText}>
                  {transformLocale(LOCALE.CHECK_REPLY)}
                </span>
                {showReply ? <ArrowUpIcon /> : <ArrowDownIcon />}
                <span style={styles.checkReplyText}>
                  {transformLocale(LOCALE.CHECK_REPLY)}
                </span>
              </div>
            )}
          </div>
          {showReply && (
            <div style={styles.answers(colors)}>
              {qa.slice(1, qa.length).map(answer => (
                <div key={answer.id} style={styles.answerText}>
                  {answer.question}
                  <span style={styles.answerDate}>
                    {`(${moment
                      .unix(answer.createdOn)
                      .format('YYYY/MM/DD h:mm a')})`}
                  </span>
                  <div style={styles.mobileAnswerDate}>
                    {moment.unix(answer.createdOn).format('YYYY/MM/DD h:mm a')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
