import React from "react";
import SubFormTranslate from "./SubFormTranslate.jsx";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../constants";
import { Tabs } from "antd";
const { TabPane } = Tabs;

const TranslateProductForm = ({
  formJP,
  formVI,
  formTL,
  formEN,
  formZH,
  response,
}) => {
  return (
    <Tabs defaultActiveKey={FIRST_TAB} centered>
      <TabPane tab="English" key={FIRST_TAB}>
        <SubFormTranslate lang="EN" form={formEN} response={response} />
      </TabPane>
      <TabPane tab="Japan" key={SECOND_TAB}>
        <SubFormTranslate lang="JA" form={formJP} />
      </TabPane>
      <TabPane tab="Thailan" key={THIRD_TAB}>
        <SubFormTranslate lang="TL" form={formTL} />
      </TabPane>
      <TabPane tab="Vietnam" key={FOURTH_TAB}>
        <SubFormTranslate lang="VI" form={formVI} response={response} />
      </TabPane>
      <TabPane tab="China" key={FIFTH_TAB}>
        <SubFormTranslate lang="ZH" form={formZH} response={response} />
      </TabPane>
    </Tabs>
  );
};

export default TranslateProductForm;
