import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageHead from "../../../commons/PageHead";
import { TableHeader } from "../../../commons/TableHeader";
import useListQuestions from "../../../hooks/logQuestion/useListQuestions.js";
import "./questionnaire.scss";
import QuestionnaireTable from "./QuestionnaireTable";

const LogQuestionnaire = () => {
  const { t } = useTranslation();
  const { listQuestions, getListQuestions } = useListQuestions();

  React.useEffect(() => {
    getListQuestions();
  }, []);

  return (
    <div className="questionnaire-container">
      <PageHead
        title={t("meta.title_questionnaire_list")}
        content={t("meta.content_questionnaire_list")}
      />
      <TableHeader
        breadcrumb={[]}
        title={t("admins.log_questionnaire.title_log_questionnaire")}
      >
        <div className="btn-group">
          <Link to="/" className="btn-show">
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white" }}
            />
            <span>{t("admins.log_questionnaire.btn_download_log")}</span>
          </Link>
        </div>
      </TableHeader>
      <div className="questionnaire-table">
        {listQuestions && <QuestionnaireTable items={listQuestions} />}
      </div>
    </div>
  );
};

export default LogQuestionnaire;
