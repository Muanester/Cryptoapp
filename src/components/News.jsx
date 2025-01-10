import React, { useState } from "react";
import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment/moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://th.bing.com/th/id/R.fb6d81a0af9eabddabebcd3e7596381e?rik=qwdzc3yIQ2mPkA&pid=ImgRaw&r=0";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);

  if (isFetching) return <Loader />;
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {cryptoNews.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title.length > 30
                    ? `${news.title.substring(0, 30)}...`
                    : news.title}
                </Title>

                <img
                  src={news.thumbnail || demoImage}
                  alt="coinImage"
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                />
              </div>

              <p>
                {news.excerpt.length > 100
                  ? `${news.excerpt.substring(0, 100)}...`
                  : news.excerpt}
              </p>

              <div className="provider-container">
                <div>
                  <Avatar src={news.publisher?.favicon || demoImage}></Avatar>

                  <Text className="provider-name">{news.authors[0]}</Text>
                </div>
                <Text>{moment(news.date).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default News;
