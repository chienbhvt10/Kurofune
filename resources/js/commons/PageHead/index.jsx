import React from "react";
import Helmet from "react-helmet";
const PageHead = ({ title, content }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta name="og:title" content={content} />
    </Helmet>
  );
};

export default PageHead;
