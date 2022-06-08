import { Tabs } from "antd";
import React from "react";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FOURTH_TAB,
  SECOND_TAB,
  THIRD_TAB,
} from "../../constants/index.js";
import SubFormTranslate from "../../pages/admin/product/product-form/SubFormTranslate.jsx";
const { TabPane } = Tabs;

const SwitchTabsLangForm = ({
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
      <TabPane tab="Tagalog" key={THIRD_TAB}>
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

export default SwitchTabsLangForm;
