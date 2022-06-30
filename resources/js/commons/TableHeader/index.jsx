import { faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UploadCsv from "../UploadCsv/UploadCsv";
import { Breadcrumb } from "../../commons/Breadcrumb";
import "./table-header.scss";

export const TableHeader = ({
  children,
  title,
  breadcrumb,
  addLink,
  onSearch,
  searchField,
  searchPlaceHolder,
  onChangeSearch,
  onResetFilter,
  showReset,
  exportCsv,
  importCsv,
  onExportCsv,
  onImportCsv,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onNavigateCreate = () => {
    navigate(addLink);
  };

  return (
    <Row justify="center" className="table-header">
      <Col span={24}>
        <Breadcrumb title={title} breadcrumb={breadcrumb} />
      </Col>
      <Col span={24}>
        <Row align="middle" gutter={[0, 10]}>
          <Col span={24}>
            <Row gutter={[10, 10]} justify="space-between">
              <Col>
                <Row gutter={[10, 10]}>
                  <Col>
                    {addLink ? (
                      <Button type="primary" onClick={onNavigateCreate}>
                        <FontAwesomeIcon className="mr-1" icon={faPlus} />
                        {t("admins.btn_add_new")}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Col>
                  <Col>
                    {showReset ? (
                      <Button
                        className="btn-reset"
                        type="primary"
                        onClick={onResetFilter}
                      >
                        {t("admins.btn_reset")}
                      </Button>
                    ) : (
                      ""
                    )}
                  </Col>
                  {exportCsv && (
                    <Col>
                      <Button
                        className="btn-export"
                        type="primary"
                        onClick={onExportCsv}
                      >
                        <FontAwesomeIcon
                          icon={faDownload}
                          className="mr-2"
                          style={{ color: "white" }}
                        />
                        <span>{t("admins.log_chatbot.btn_export")}</span>
                      </Button>
                    </Col>
                  )}
                  {importCsv && (
                    <Col>
                      <UploadCsv onChangeFile={onImportCsv} />
                    </Col>
                  )}
                </Row>
              </Col>
              {searchField && (
                <Col>
                  <Form onFinish={onSearch} autoComplete="off">
                    <Row align="middle" gutter={[10, 10]}>
                      <Col>
                        <Form.Item name={searchField} className="search-field">
                          <Input
                            type="text"
                            placeholder={searchPlaceHolder}
                            onChange={onChangeSearch}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <Button
                          className="btn-search"
                          type="primary"
                          htmlType="submit"
                        >
                          {t("admins.btn_search")}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              )}
            </Row>
          </Col>

          <Col>{children}</Col>
        </Row>
      </Col>
    </Row>
  );
};
