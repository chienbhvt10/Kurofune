import React, { useState } from "react";
import "./log.scss";
import { TableHeader } from "../../../commons/TableHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Table, Button, Modal } from "antd";
import useListChat from "../../../hooks/logChat/useListChat";
import { HistoryChat } from "./history-chat";
import useDetailChat from "../../../hooks/logChat/useDetailChat";
import useExportCsv from "../../../hooks/logChat/useExportCSV";
import useExportCsvAll from "../../../hooks/logChat/useExportCSVAll";
const LogChatBot = () => {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [langChat, setLangChat] = useState();
  const [idChat, setIdChat] = useState();
  const { listChat, getListChat } = useListChat();
  const { detailChat, getDetailChat } = useDetailChat();
  const { csvUser, exportCsvUser } = useExportCsv();
  const { csvAllUser, exportCsvAll } = useExportCsvAll();

  React.useEffect(() => {
    if (!listChat) {
      getListChat();
    }
  }, [listChat]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (value, item, index) => (page - 1) * 10 + index,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ユーザーID",
      dataIndex: "user_id",
      key: "user_id",
    },
    {
      title: "ユーザー名",
      dataIndex: "name_user",
      key: "name_user",
    },
    {
      title: "チャット履歴",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button type="primary" onClick={() => openModalHistory(id, "message")}>
          表示
        </Button>
      ),
    },
    {
      title: "チャット履歴 (日本語）",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          type="primary"
          onClick={() => openModalHistory(id, "message_ja")}
        >
          日本語で表示
        </Button>
      ),
    },
    {
      title: "作成日",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "ダウンロード",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          onClick={() => exportHistoryChatBot({ id: id, export_ja: false })}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
        </Button>
      ),
    },
    {
      title: "ダウンロード(日本語）",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          onClick={() => exportHistoryChatBot({ id: id, export_ja: true })}
        >
          <FontAwesomeIcon
            icon={faDownload}
            className=""
            style={{ color: "#62a19b" }}
          />
        </Button>
      ),
    },
  ];

  const exportHistoryChatBot = (data) => {
    let content = `No.,ユーザーID,ユーザー名,チャット履歴,作成日,更新日
    1,1,"wabisabi admin","[{date: '2022/05/04', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    2,1,"wabisabi admin","[{date: '2022/05/11', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    3,1,"wabisabi admin","[{date: '2022/05/11', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    4,1,"wabisabi admin","[{date: '2022/05/12', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    5,1,"wabisabi admin","[{date: '2022/05/13', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    6,1,"wabisabi admin","[{date: '2022/05/13', question: '言語を選択ください。'}
    {date: '2022/05/13', answer: 'ベトナム語'}
    {date: '2022/05/13', question: '①チャットボットを通じていただいた情報を基に最適なお薬を提供します。 対面で情報をいただく場合とお薬が変わることがあります。<br> ②薬剤師の判断で販売できない場合があります。<br>③薬剤師の注意事項に承認いただかないと販売できない場合があります。'}
    {date: '2022/05/13', answer: '同意'}
    {date: '2022/05/13', question: 'Bạn có đang mang thai không ? '}
    {date: '2022/05/13', answer: 'はい '}
    {date: '2022/05/13', question: '本サービスは妊娠されいてる方はご利用いただけません。'}
    {date: '2022/05/13', answer: 'いいえ'}
    {date: '2022/05/13', question: '今飲んでいる薬はありますか？'}
    {date: '2022/05/13', answer: 'ない'}
    {date: '2022/05/13', question: 'どのような症状ですか？'}
    {date: '2022/05/13', answer: '咳を止めたい'}
    {date: '2022/05/13', question: ' Bạn có sốt không ?'}
    {date: '2022/05/13', answer: 'いいえ'}
    {date: '2022/05/13', question: '基礎疾患はありますか？'}
    {date: '2022/05/13', answer: 'ない'}
    {date: '2022/05/13', question: 'おすすめのお薬はこちらです。'}
    {date: '2022/05/13', question: 'https://member.wabisabi.media/wp-content/uploads/2021/12/7_benzablock_premium-l-1.jpg'}]",2022/05/17,2022/05/17
    7,1,"wabisabi admin","[{date: '2022/05/13', question: '言語を選択ください。'}
    {date: '2022/05/13', answer: 'ベトナム語'}
    {date: '2022/05/13', question: '①チャットボットを通じていただいた情報を基に最適なお薬を提供します。 対面で情報をいただく場合とお薬が変わることがあります。<br> ②薬剤師の判断で販売できない場合があります。<br>③薬剤師の注意事項に承認いただかないと販売できない場合があります。'}
    {date: '2022/05/13', answer: '日本語'}
    {date: '2022/05/13', answer: '同意しない'}
    {date: '2022/05/13', question: '本サービスは同意いただけないとご利用いただけません。'}
    {date: '2022/05/13', answer: '最初に戻る'}
    {date: '2022/05/13', question: '言語を選択ください。'}
    {date: '2022/05/13', answer: '日本語'}
    {date: '2022/05/13', question: '①チャットボットを通じていただいた情報を基に最適なお薬を提供します。 対面で情報をいただく場合とお薬が変わることがあります。<br> ②薬剤師の判断で販売できない場合があります。<br>③薬剤師の注意事項に承認いただかないと販売できない場合があります。'}
    {date: '2022/05/13', answer: '同意'}
    {date: '2022/05/13', question: '現在妊娠していますか？'}
    {date: '2022/05/13', answer: 'いいえ'}
    {date: '2022/05/13', question: '今飲んでいる薬はありますか？'}
    {date: '2022/05/13', answer: '最初に戻る'}
    {date: '2022/05/13', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    8,2,"KUROFUNE ADMIN","[{date: '2022/05/16', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    9,1,"wabisabi admin","[{date: '2022/05/16', answer: '最初に戻る'}
    {date: '2022/05/16', question: '言語を選択ください。'}
    {date: '2022/05/16', answer: 'ベトナム語'}
    {date: '2022/05/16', question: '①チャットボットを通じていただいた情報を基に最適なお薬を提供します。 対面で情報をいただく場合とお薬が変わることがあります。<br> ②薬剤師の判断で販売できない場合があります。<br>③薬剤師の注意事項に承認いただかないと販売できない場合があります。'}
    {date: '2022/05/16', answer: '同意しない'}
    {date: '2022/05/16', question: '本サービスは同意いただけないとご利用いただけません。'}
    {date: '2022/05/16', answer: '同意'}
    {date: '2022/05/16', question: 'Bạn có đang mang thai không ? '}
    {date: '2022/05/16', answer: 'はい '}
    {date: '2022/05/16', question: '本サービスは妊娠されいてる方はご利用いただけません。'}
    {date: '2022/05/16', answer: 'いいえ'}
    {date: '2022/05/16', question: '今飲んでいる薬はありますか？'}
    {date: '2022/05/16', answer: 'ある'}
    {date: '2022/05/16', question: 'あなたはサービスの条件に満たしておりません。'}
    {date: '2022/05/16', answer: 'ない'}
    {date: '2022/05/16', question: 'どのような症状ですか？'}
    {date: '2022/05/16', answer: '痛みをなくしたい'}
    {date: '2022/05/16', question: '痛いのはどこですか？'}
    {date: '2022/05/16', answer: 'お腹'}
    {date: '2022/05/16', question: 'おすすめのお薬はこちらです。'}
    {date: '2022/05/16', question: 'https://member.wabisabi.media/wp-content/uploads/2022/02/3_gaster10.jpeg'}
    {date: '2022/05/16', answer: '頭'}
    {date: '2022/05/16', question: 'おすすめのお薬はこちらです。'}
    {date: '2022/05/16', question: 'https://member.wabisabi.media/wp-content/uploads/2021/12/1_loxonin-s-1.jpg'}
    {date: '2022/05/16', answer: '腰'}
    {date: '2022/05/16', question: 'おすすめのお薬はこちらです。'}
    {date: '2022/05/16', question: 'https://member.wabisabi.media/wp-content/uploads/2021/12/2_loxonin-s_tape.jpg'}]",2022/05/17,2022/05/17
    10,1,"wabisabi admin","[{date: '2022/05/16', question: '言語を選択ください。'}
    {date: '2022/05/16', answer: '最初に戻る'}
    {date: '2022/05/16', question: '言語を選択ください。'}]",2022/05/17,2022/05/17
    11,1,"wabisabi admin","[{date: '2022/05/16', question: '言語を選択ください。'}
    {date: '2022/05/16', answer: 'ベトナム語'}
    {date: '2022/05/16', question: '①チャットボットを通じていただいた情報を基に最適なお薬を提供します。 対面で情報をいただく場合とお薬が変わることがあります。<br> ②薬剤師の判断で販売できない場合があります。<br>③薬剤師の注意事項に承認いただかないと販売できない場合があります。'}]",2022/05/17,2022/05/17
    12,1,"wabisabi admin","[{date: '2022/05/16', question: '言語を選択ください。'}]",2022/05/17,2022/05/17`;
    if (data.id) {
      exportCsvUser(data);
      content = csvUser;
    } else {
      exportCsvAll(data);
      content = csvAllUser;
    }

    downloadBlob(content, data.id);
  };

  const openModalHistory = (id, langChat) => {
    if (!detailChat || idChat !== id) {
      getDetailChat(id);
      setIdChat(id);
    }
    setLangChat(langChat);
    setVisible(true);
  };

  const downloadBlob = (content, idUser) => {
    const dateExported = new Date();
    const BOM = "\uFEFF";
    content = BOM + content;
    const blob = new Blob([content], { type: "data:text/csv;charset=utf-8," });
    const url = URL.createObjectURL(blob);
    let dow = document.createElement("a");
    dow.href = url;
    const fileName = `${idUser ? "User" + idUser + "_" : ""}chat_log_export_${
      dateExported.toISOString().split("T")[0] 
    }.csv`;
    dow.setAttribute("download", fileName);
    dow.click();
  };
  return (
    <div className="log-container">
      <TableHeader
        breadcrumb={[
          { name: "Home", routerLink: "../" },
          { name: "Chatbot List", routerLink: "/log-questionnaire" },
        ]}
        title="Chatbot List"
      >
        <div>
          <Button
            type="primary"
            onClick={() => exportHistoryChatBot({ export_ja: false })}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="mr-2"
              style={{ color: "white" }}
            />
            <span> CSVダウンロード</span>
          </Button>
          <Button
            className="ml-2"
            type="primary"
            onClick={() => exportHistoryChatBot({ export_ja: true })}
          >
            <FontAwesomeIcon
              icon={faDownload}
              className="mr-2"
              style={{ color: "white" }}
            />
            <span> CSVダウンロード (日本語）</span>
          </Button>
        </div>
      </TableHeader>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={listChat}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
      />
      <Modal
        title="History chatbot"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={"1000"}
      >
        <HistoryChat data={detailChat} langChat={langChat} />
      </Modal>
    </div>
  );
};

export default LogChatBot;
