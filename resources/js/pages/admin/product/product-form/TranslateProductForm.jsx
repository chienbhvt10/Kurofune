import { Tabs } from "antd";
import {
  FIFTH_TAB,
  FIRST_TAB,
  FOURTH_TAB,
  LANG_CHINESE,
  LANG_ENGLISH,
  LANG_JAPANESE,
  LANG_PHILIPPINES,
  LANG_VIETNAMESE,
  SECOND_TAB,
  THIRD_TAB,
} from "../../../../constants";
import SubFormTranslate from "./SubFormTranslate.jsx";
const { TabPane } = Tabs;

const TranslateProductForm = (props) => {
  const { formJP, formVI, formTL, formEN, formZH, response } = props;

  return (
    <Tabs defaultActiveKey={FIRST_TAB} centered>
      <TabPane tab="English" key={FIRST_TAB}>
        <SubFormTranslate
          lang={LANG_ENGLISH}
          form={formEN}
          response={response}
        />
      </TabPane>
      <TabPane tab="Japanese" key={SECOND_TAB}>
        <SubFormTranslate lang={LANG_JAPANESE} form={formJP} />
      </TabPane>
      <TabPane tab="Tagalog" key={THIRD_TAB}>
        <SubFormTranslate lang={LANG_PHILIPPINES} form={formTL} />
      </TabPane>
      <TabPane tab="Vietnamese" key={FOURTH_TAB}>
        <SubFormTranslate
          lang={LANG_VIETNAMESE}
          form={formVI}
          response={response}
        />
      </TabPane>
      <TabPane tab="Chinese" key={FIFTH_TAB}>
        <SubFormTranslate
          lang={LANG_CHINESE}
          form={formZH}
          response={response}
        />
      </TabPane>
    </Tabs>
  );
};

export default TranslateProductForm;
