import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import PageHead from "../../../commons/PageHead";
import { TableHeader } from "../../../commons/TableHeader";
import useListQuestions from "../../../hooks/logQuestion/useListQuestions.js";
import "./questionnaire.scss";
import QuestionnaireTable from "./QuestionnaireTable";
import { Button } from "antd";
import useExportAllLog from "../../../hooks/logQuestion/useExportAllLog.js";
import useExportDetailLog from "../../../hooks/logQuestion/useExportDetailLog.js";

const LogQuestionnaire = () => {
  const { t } = useTranslation();
  const { getListQuestions, listQuestions } = useListQuestions();
  const { csvAllLog, exportAllLog } = useExportAllLog();
  const { csvDetailLog, exportDetailLog } = useExportDetailLog();

  const handleExportAllCSV = (e) => {
    e.preventDefault();
    exportAllLog();
  };

  const handleExportDetailCSV = (e, data) => {
    e.preventDefault();
    exportDetailLog(data);
  };

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
          <Button type="primary" onClick={handleExportAllCSV}>
            <FontAwesomeIcon
              icon={faDownload}
              className=""
              style={{ color: "white", marginRight: "6px" }}
            />
            <span>{t("admins.log_questionnaire.btn_download_log")}</span>
          </Button>
        </div>
      </TableHeader>
      <div className="questionnaire-table">
        {listQuestions && (
          <QuestionnaireTable
            items={listQuestions}
            handleExportDetailCSV={handleExportDetailCSV}
          />
        )}
      </div>
    </div>
  );
};

export default LogQuestionnaire;
