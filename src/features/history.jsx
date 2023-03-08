import {  Table } from 'antd';
import { useState } from 'react';
import {  useSelector } from "react-redux";
const columns = [
  {
    title: 'Link',
    dataIndex: 'link',
    key: 'link',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Played Time',
    dataIndex: 'time',
    key: 'time',
  }
];

export const VideoPlayedHistory = () => {
    const { videoHistory } = useSelector((state) => state.videoCards);
    return (
        <Table columns={columns} size='small' rowKey='time' dataSource={videoHistory} />
    )
};