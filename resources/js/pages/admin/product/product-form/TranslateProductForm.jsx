import React from "react";
import SwitchTabLangForm from "../../../../commons/SwitchTabLangForm/SwitchTabLangForm";
import SubFormTranslate from "./SubFormTranslate.jsx";
import {
        FIFTH_TAB,
        FIRST_TAB,
        FOURTH_TAB,
        SECOND_TAB,
        THIRD_TAB,
} from "../../../../constants"

const TranslateProductForm = ({ formJP, formVI, formTL, formEN, formZH, response }) => {
        const [activeTab, setActiveTab] = useState(FIRST_TAB);
        const onChangeLanguageForm = (number) => {
                setActiveTab(number);
        };
        return (
                <SwitchTabLangForm
                        onChangeLanguageForm={onChangeLanguageForm}
                        activeTab={activeTab}
                        response={response}
                >
                        <SubFormTranslate
                                lang="EN"
                                className={`tab ${activeTab === FIRST_TAB ? "active" : ""}`}
                                form={formEN}
                                response={response}
                        />
                        <SubFormTranslate
                                lang="JA"
                                className={`tab ${activeTab === SECOND_TAB ? "active" : ""}`}
                                form={formJP}
                        />
                        <SubFormTranslate
                                lang="TL"
                                className={`tab ${activeTab === THIRD_TAB ? "active" : ""}`}
                                form={formTL}
                        />
                        <SubFormTranslate
                                lang="VI"
                                className={`tab ${activeTab === FOURTH_TAB ? "active" : ""}`}
                                form={formVI}
                                response={response}
                        />
                        <SubFormTranslate
                                lang="ZH"
                                className={`tab ${activeTab === FIFTH_TAB ? "active" : ""}`}
                                form={formZH}
                                response={response}
                        />
                </SwitchTabLangForm>
        );
};

export default TranslateProductForm;
