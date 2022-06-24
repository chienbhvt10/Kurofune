import { Empty } from "antd";
import { useTranslation } from "react-i18next";

export const EMPTY_TABLE_LIST = () => {
  const { t } = useTranslation();
  return {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={<span>{t("admins.list_empty")}</span>}
      ></Empty>
    ),
  };
};
