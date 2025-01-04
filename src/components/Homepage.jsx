import React from "react";
import millify from "millify";
import { Col, Row, Statistic, Typography } from "antd";
import { Link } from "react-router";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

function Homepage() {
  const { data, isFetching } = useGetCryptosQuery();
  if (isFetching) {
    return "Loading...";
  }

  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title={"Total Cryptocurrencies "}
            value={globalStats.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Exchanges "}
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Market Cap "}
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total 24h Volume "}
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Markets "}
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>
    </>
  );
}

export default Homepage;
