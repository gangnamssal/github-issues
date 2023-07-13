/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ReactMarkdown from 'react-markdown';

import testImg from 'assets/image.png';
import { Issue } from '@/modules/homeStore';
import { useLocation } from 'react-router-dom';

export default function IssueDetailContents() {
  const issue: Issue = useLocation().state;
  const [year, month, date] = issue.created_at.split('T')[0].split('-');
  console.log(issue);
  return (
    <div css={containerStyle}>
      <div css={profileStyle}>
        <div>
          <img src={testImg} alt="testImg" />
        </div>
        <div>
          <p>{`#${issue.number}`} issue title</p>
          <p>
            작성자: {issue.user.login}, 작성일: {year}년 {month}월 {date}일
          </p>
        </div>
        <p>코멘트: {issue.comments}</p>
      </div>

      <div css={lineStyle}>
        <div></div>
      </div>

      <ReactMarkdown>{issue.body}</ReactMarkdown>
    </div>
  );
}

const containerStyle = css`
  width: 100%;
  height: auto;
`;

const profileStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  img {
    width: 50px;
    height: 20px;
    border-radius: 50px;
  }
`;

const lineStyle = css`
  display: flex;
  justify-content: center;
  div {
    width: 40%;
    height: 2px;
    background-color: #ddddddff;
  }
`;
