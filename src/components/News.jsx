import React from "react";
import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment/moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;

function News({ simplified }) {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Crypto",
    count: simplified ? 10 : 100,
  });

  console.log(cryptoNews);

  if (isFetching) return "Loading...";
  return <div>News</div>;
}

export default News;
