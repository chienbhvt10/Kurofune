import React from "react";
import {
  policy3OderListData,
  policy4OderListData,
  policy5SubOderListData1,
  policy5SubOderListData2,
  policy6SubOderListData,
  policy7OderListData,
  policy8OderListData,
  policy9OderListData,
} from "../../commons/data";
import OrderList from "../../commons/Orderlist";
import "./modal-custom.scss";
const ModalPolicy = ({text}) => {
  return (
    <div id="modal-policy" className="modal-custom">
      <a
        style={{ color: "#62A19B" }}
        type="button"
        className=""
        data-toggle="modal"
        data-target="#exampleModalLong2"
      >
        {text}
      </a>
      <div
        className="modal fade"
        id="exampleModalLong2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle2"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle2">
                Chính sách bảo mật
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-content-wrap">
                <p>
                  <span
                    style={{ fontFamily: "arial, helvetica, sans-serif" }}
                  ></span>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    一般社団法人在日外国人就業者支援協会（以下、「当協会」といいます。）は、当協会が生活支援ポータルサイトにて展開するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                  </span>
                </p>
                <p>
                  <strong>第1条（個人情報）</strong>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）、を指します。また
                  </span>
                  <span style={{ fontWeight: 400 }}>
                    当協会では、サービス向上およびお客様により適したサービスを提供するため、Cookieを利用しています。
                  </span>
                </p>
                <p>
                  <strong>第2条（個人情報の収集方法）</strong>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    当協会は、以下の方法で個人情報を取得します。
                  </span>
                </p>
                <ul>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      ユーザーから直接、個人情報の提供を受ける方法&nbsp;
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      ユーザーが本サービスを利用する際に、自動的に個人情報を記録する方法&nbsp;
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      第三者から間接的にユーザーの個人情報の提供を受ける方法&nbsp;
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      刊行物やインターネット等で公開された個人情報を取得する方法
                    </span>
                  </li>
                </ul>
                <p>
                  <strong>第3条（個人情報を収集・利用する目的）</strong>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    当協会が個人情報、Cookieを収集・利用する目的は、以下のとおりです当協会サービスの利用者に際して会員登録するため
                  </span>
                </p>
                <OrderList
                  data={policy3OderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <strong>第4条（利用目的の変更）</strong>
                </p>
                <OrderList
                  data={policy4OderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <strong>第5条（個人情報の第三者提供）</strong>
                </p>
                <ol>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      当協会は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報やCookieを提供することはありません。ただし、個人情報保護法その他の法令で認められる場合や当社が利用目的の達成に必要な範囲内において個人情報の取り扱いの全部または一部を委託する場合を除きます。
                    </span>
                    <OrderList
                      data={policy5SubOderListData1}
                      liStyle={{ fontWeight: 400 }}
                      spanStyle={{ fontWeight: 400 }}
                      arialLevel={2}
                    />
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
                    </span>
                    <OrderList
                      data={policy5SubOderListData2}
                      liStyle={{ fontWeight: 400 }}
                      spanStyle={{ fontWeight: 400 }}
                      arialLevel={2}
                    />
                  </li>
                </ol>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>・共同利用する事業者</span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>
                    資本関係がある会社に限る
                  </span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>
                    ・共同利用する個人情報
                  </span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>
                    お客様が当協会に提供した全ての個人データ
                  </span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>・共同利用する目的</span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>
                    第３条にて規定した目的を達成するため
                  </span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>
                    ・個人情報の管理について責任を有するものの氏名
                  </span>
                </p>
                <p style={{ paddingLeft: 40 }}>
                  <span style={{ fontWeight: 400 }}>
                    KUROFUNE株式会社：倉片稜
                  </span>
                </p>
                <p>
                  <strong>第6条（個人情報の開示）</strong>
                </p>
                <ol>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>当協会は、</span>
                    <span style={{ fontWeight: 400 }}>
                      法令遵守または利用目的の達成に必要な範囲・期間において、個人情報を保管・利用しますが、ユーザー本人または代理人は、当社所定の手続きに従い、ユーザー本人が識別される個人情報の開示・内容の訂正、追加または削除・利用の停止または消去および利用目的の通知を求めることができます。なお、なりすまし等による不正な請求を防止するため、当協会では、請求時に本人確認書類の提出を求める等、合理的な方法で本人確認を行います。当協会は、当協会が定める本人確認に必要な項目（氏名、住所、勤務先、メールアドレス）が全て満たされる場合、当該請求をユーザー本人からの請求であるとみなし、郵送またはメールアドレスにて情報を開示いたします。
                      <br />
                      <br />
                    </span>
                    ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。なお、個人情報の開示に際しては、1件あたり1,000円の手数料を申し受けます。
                  </li>
                </ol>
                <ol>
                  <li style={{ listStyleType: "none" }}>
                    <OrderList
                      data={policy6SubOderListData}
                      liStyle={{ fontWeight: 400 }}
                      spanStyle={{ fontWeight: 400 }}
                      arialLevel={2}
                    />
                  </li>
                </ol>
                <p>
                  <strong>第7条（個人情報の訂正および削除）</strong>
                </p>
                <OrderList
                  data={policy7OderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <strong>第8条（個人情報の利用停止等）</strong>
                </p>
                <OrderList
                  data={policy8OderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <strong>第9条（プライバシーポリシーの変更）</strong>
                </p>
                <OrderList
                  data={policy9OderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <strong>第10条（お問い合わせ窓口）</strong>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
                  </span>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    住所：愛知県名古屋市西区那古野2-14-1 なごのキャンパス2-6
                  </span>
                  <span style={{ fontWeight: 400 }}>
                    <br />
                  </span>
                  <span style={{ fontWeight: 400 }}>
                    社名：一般社団法人在日外国人就業者支援協会
                  </span>
                  <span style={{ fontWeight: 400 }}>
                    <br />
                  </span>
                  <span style={{ fontWeight: 400 }}>
                    Eメールアドレス：info@kurofune-inc.com
                  </span>
                </p>
                <p style={{ textAlign: "right" }}>
                  <span style={{ fontWeight: 400 }}>以上&nbsp; &nbsp;</span>
                </p>
                <p style={{ textAlign: "right" }}>
                  <span style={{ fontWeight: 400 }}>
                    制定日：2022年1月4日&nbsp; &nbsp;
                  </span>
                </p>
                <p>&nbsp;</p>
                <p style={{ textAlign: "center" }}>
                  <span style={{ fontWeight: 400 }}>記</span>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    当協会は、当協会サービスにて取扱う保有個人データの漏えい、滅失またはき損の防止その他保有個人データの安全管理のため、個人情報取扱規程等の整備および実施体制の整備等、十分なセキュリティ対策を講じます。かかる保有個人データの安全管理措置は、個人情報保護法に定めるところに従い、ユーザー様から開示のご要請がある場合には、遅滞なく開示するものとします。
                  </span>
                </p>
                <p style={{ textAlign: "right" }}>
                  <span style={{ fontWeight: 400 }}>以上&nbsp; &nbsp;</span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span
                    style={{ fontFamily: "arial, helvetica, sans-serif" }}
                  ></span>
                </p>{" "}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPolicy;
