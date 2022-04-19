import React from "react";
import OrderList from "../../commons/Orderlist";
import "./modal-custom.scss";
import {
  term1ListData,
  term2SubOrderListData,
  term3OrderListData,
  term4OrderListData,
  term5ListData,
  term6SubOrderListData,
  term7SubOrderListData,
  term9OrderListData,
} from "../../commons/data";
const ModalTerm = ({text}) => {
  return (
    <div id="modal-term" className="modal-custom">
      <a
        style={{ color: "#62A19B" }}
        type="button"
        className=""
        data-toggle="modal"
        data-target="#exampleModalLong"
      >
     {text}
      </a>
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Điều khoản sử dụng
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
                  <span style={{ fontWeight: 400 }}>
                    この利用規約（以下，「本規約」といいます。）は，一般社団法人在日外国人就業者支援協会（以下，「当社」といいます。）がこのウェブサイト上で提供する生活支援サービスポータルサイト（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
                  </span>
                </p>
                <p>
                  <b>第1条（適用）</b>
                </p>
                <OrderList
                  data={term1ListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <b>第2条（利用登録）</b>
                </p>
                <ol>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
                    </span>
                    <OrderList
                      data={term2SubOrderListData}
                      liStyle={{ fontWeight: 400 }}
                      spanStyle={{ fontWeight: 400 }}
                      arialLevel={2}
                    />
                  </li>
                </ol>
                <p>
                  <b>第3条（ユーザーIDおよびパスワードの管理）</b>
                </p>
                <OrderList
                  data={term3OrderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <b>第4条（利用料金および支払方法）</b>
                </p>
                <OrderList
                  data={term4OrderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <b>第5条（禁止事項）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
                  </span>
                </p>
                <OrderList
                  data={term5ListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <b>第6条（本サービスの提供の停止等）</b>
                </p>
                <ol>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                    </span>
                    <OrderList
                      data={term6SubOrderListData}
                      liStyle={{ fontWeight: 400 }}
                      spanStyle={{ fontWeight: 400 }}
                      arialLevel={2}
                    />
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      当社は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
                    </span>
                  </li>
                </ol>
                <p>
                  <b>第7条（利用制限および登録抹消）</b>
                </p>
                <ol>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      当社は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
                    </span>
                    <OrderList
                      data={term7SubOrderListData}
                      liStyle={{ fontWeight: 400 }}
                      spanStyle={{ fontWeight: 400 }}
                      arialLevel={2}
                    />
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      当社は，本条に基づき当社が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
                    </span>
                  </li>
                </ol>
                <p>
                  <b>第8条（退会）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    ユーザーは，当社の定める退会手続により，本サービスから退会できるものとします。
                  </span>
                </p>
                <p>
                  <b>第9条（保証の否認および免責事項）</b>
                </p>
                <OrderList
                  data={term9OrderListData}
                  liStyle={{ fontWeight: 400 }}
                  spanStyle={{ fontWeight: 400 }}
                  arialLevel={1}
                />
                <p>
                  <b>第10条（サービス内容の変更等）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    当社は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
                  </span>
                </p>
                <p>
                  <b>第11条（利用規約の変更）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    当社は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，当該ユーザーは変更後の規約に同意したものとみなします。
                  </span>
                </p>
                <p>
                  <b>第12条（個人情報の取扱い）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。
                  </span>
                </p>
                <p>
                  <b>第13条（通知または連絡）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    ユーザーと当社との間の通知または連絡は，当社の定める方法によって行うものとします。当社は,ユーザーから,当社が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
                  </span>
                </p>
                <p>
                  <b>第14条（権利義務の譲渡の禁止）</b>
                </p>
                <p>
                  <span style={{ fontWeight: 400 }}>
                    ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
                  </span>
                </p>
                <p>
                  <b>第15条（準拠法・裁判管轄）</b>
                </p>
                <ol>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      本規約の解釈にあたっては，日本法を準拠法とします。
                    </span>
                  </li>
                  <li style={{ fontWeight: 400 }} aria-level="1">
                    <span style={{ fontWeight: 400 }}>
                      本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
                    </span>
                  </li>
                </ol>
                <p>
                  <span style={{ fontWeight: 400 }}>以上</span>
                </p>
                <p>&nbsp;</p>{" "}
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

export default ModalTerm;
