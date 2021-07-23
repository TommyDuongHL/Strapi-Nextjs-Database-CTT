import Head from 'next/head';
import Link from "next/link";
import React from "react";

const IndexPage = () => {

  return (
    <div className="hero">
      <Head>
        <title>Index Page</title>
      </Head>
      <div className="text">
        <h1>Check-the-test</h1>
      </div>
    </div>
  );
};

export default IndexPage;
