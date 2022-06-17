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
  isFormSubmitted,
}) => {
  return (
    <Tabs defaultActiveKey={FIRST_TAB} centered>
      <TabPane tab="English" key={FIRST_TAB}>
        <SubFormTranslate
          errorField="en.name"
          lang="EN"
          form={formEN}
          response={response}
          isFormSubmitted={isFormSubmitted}
        />
      </TabPane>
      <TabPane tab="Japanese" key={SECOND_TAB}>
        <SubFormTranslate
          errorField="ja.name"
          lang="JA"
          form={formJP}
          response={response}
          isFormSubmitted={isFormSubmitted}
        />
      </TabPane>
      <TabPane tab="Tagalog" key={THIRD_TAB}>
        <SubFormTranslate
          errorField="tl.name"
          lang="TL"
          form={formTL}
          response={response}
          isFormSubmitted={isFormSubmitted}
        />
      </TabPane>
      <TabPane tab="Vietnamese" key={FOURTH_TAB}>
        <SubFormTranslate
          errorField="vi.name"
          lang="VI"
          form={formVI}
          response={response}
          isFormSubmitted={isFormSubmitted}
        />
      </TabPane>
      <TabPane tab="Chinese" key={FIFTH_TAB}>
        <SubFormTranslate
          errorField="zh.name"
          lang="ZH"
          form={formZH}
          response={response}
          isFormSubmitted={isFormSubmitted}
        />
      </TabPane>
    </Tabs>
  );
};

export default SwitchTabsLangForm;
