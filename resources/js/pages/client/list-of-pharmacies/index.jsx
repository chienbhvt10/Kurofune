import React from "react";
import "./list-of-pharmacies.scss";
import PageHead from "../../../commons/PageHead";
const PharmaciesPage = () => {
  return (
    <>
      <PageHead content="List Of Pharmacies" title="List Of Pharmacies" />
      <div id="list-of-pharmacies">
        <div className="list_pharmacies">
          <div className="card card-list-pharmacies">
            <div className="table-responsive">
              <div className="name-vendor first">マリン薬局　大磯通店</div>
              <div className="vendor-wrap">
                <div className="pc d-flex justify-content-between flex-wrap">
                  <div className="item-info title">
                    薬局又は店舗の主要な外観の写真
                  </div>
                  <div className="item-info title">
                    一般用医薬品の陳列の状況を示す写真
                  </div>
                  <div className="item-info border-none">
                    <div className="item-image">
                      <img
                        alt="image-vendor"
                        src="https://member.wabisabi.media/wp-content/uploads/2022/01/marineooiso_gaikan_1-1.jpeg"
                      />
                    </div>
                  </div>
                  <div className="item-info border-none">
                    <div className="item-image">
                      <img
                        alt="image-vendor"
                        src="https://member.wabisabi.media/wp-content/uploads/2022/01/marineooiso_naikan_1-1.jpeg"
                      />
                    </div>
                    <div className="item-image">
                      <img
                        alt="image-vendor"
                        src="https://member.wabisabi.media/wp-content/uploads/2022/01/marineooiso_naikan_2-1.jpeg"
                      />
                    </div>
                  </div>
                </div>
                <div className="sp d-flex justify-content-between flex-wrap">
                  <div className="item-info title">
                    薬局又は店舗の主要な外観の写真
                  </div>
                  <div className="item-info">
                    <div className="item-image">
                      <img
                        alt="image-vendor"
                        src="https://member.wabisabi.media/wp-content/uploads/2022/01/marineooiso_gaikan_1-1.jpeg"
                      />
                    </div>
                  </div>
                  <div className="item-info title">
                    一般用医薬品の陳列の状況を示す写真
                  </div>
                  <div className="item-info border-none">
                    <div className="item-image">
                      <img
                        alt="image-vendor"
                        src="https://member.wabisabi.media/wp-content/uploads/2022/01/marineooiso_naikan_1-1.jpeg"
                      />
                    </div>
                    <div className="item-image">
                      <img
                        alt="image-vendor"
                        src="https://member.wabisabi.media/wp-content/uploads/2022/01/marineooiso_naikan_2-1.jpeg"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-none item-info title">
                  現在勤務している薬剤師（担当業務）
                </div>
                <div className="d-none item-info">
                  松浦
                  倫子（調剤・医薬品の販売等）08:00〜19:30（月火水金）08:00〜12:30（土）
                  大橋康治（調剤・医薬品の販売等）08:00〜19:30（月火水）
                  08:00〜12:30（土）
                  坂田淳平（調剤・医薬品の販売等）08:00〜18:00（月火水金）08:00〜12:30（土）
                </div>
                <div className="d-none item-info title">
                  現在勤務している登録販売者（担当業務）
                </div>
                <div className="d-none item-info "></div>
                <div className="d-none item-info title">
                  開店時間と特定販売を行う時間が異なる場合の開店時間及び
                  <br />
                  特定販売を行う時間{" "}
                </div>
                <div className="d-none item-info "></div>
              </div>
              <div className="name-vendor second">
                管理および運営に関する事項
              </div>
              <div className="vendor-wrap">
                <div className="item-info title">許可の区分</div>
                <div className="item-info item-info ">薬局</div>
                <div className="item-info title">開設者</div>
                <div className="item-info">
                  株式会社マリン 代表取締役 藤田哲康
                </div>
                <div className="item-info title">許可証の記載事項</div>
                <div className="item-info">
                  名局第948号
                  <br />
                  マリン薬局　大磯通店
                  <br />
                  愛知県名古屋市南区城下町2-36-3
                  <br />
                  令和3年8月13日から令和9年8月12日
                </div>
                <div className="item-info title">管理薬剤師</div>
                <div className="item-info">松浦 倫子</div>
                <div className="item-info title">
                  当薬局に勤務する薬剤師（担当業務）
                </div>
                <div className="item-info">
                  松浦 倫子・大橋康治・坂田淳平（調剤・医薬品の販売等）
                </div>
                <div className="item-info title">
                  当薬局に勤務する登録販売者（担当業務）
                </div>
                <div className="item-info"></div>
                <div className="item-info title">
                  取り扱う一般用医薬品等の種別
                </div>
                <div className="item-info">
                  要指導医薬品・第1類医薬品 第2類医薬品 指定2類医薬品
                  第3類医薬品
                </div>
                <div className="item-info title">
                  当薬局に勤務する者の名札等による区別
                </div>
                <div className="item-info has-line-border">
                  薬剤師は白衣を着用し、名札を青で「薬剤師」及び氏名を明記
                  <hr />
                  一般従事者はピンク色のユニフォームを着用し、名札を白で「事務」及び氏名を明記
                </div>

                <div className="item-info title">営業時間</div>
                <div className="item-info">
                  08:00〜19:30（月火水金）
                  <br />
                  08:00〜12:30（土）
                </div>
                <div className="item-info title">
                  営業時間外における相談時間
                </div>
                <div className="item-info">時間外はすべて</div>

                <div className="item-info title">
                  相談時及び緊急時の連絡先
                </div>
                <div className="item-info">
                  ・営業時間内は店舗で相談を受け付けます。電話の場合は052-821-1100で受け付けております。
                  <br />
                  メールアドレス① marin-oiso@kzh.biglobe.ne.jp
                  <br />
                  ・緊急時及び営業時間外におけるご相談は090-1414-4709で受け付けております。
                  <br />
                  メールアドレス② marine.ooiso@gmail.com
                </div>

                <div className="item-info title">
                  現在勤務している薬剤師（担当業務）
                </div>
                <div className="item-info has-line-border">
                  松浦
                  倫子（調剤・医薬品の販売等）08:00〜19:30（月火水金）08:00〜12:30（土）
                  <hr />
                  大橋康治（調剤・医薬品の販売等）08:00〜19:30（月火水）
                  08:00〜12:30（土）
                  <hr />
                  坂田淳平（調剤・医薬品の販売等）08:00〜18:00（月火水金）08:00〜12:30（土）
                </div>
                <div className="item-info title">
                  開店時間と特定販売を行う時間が異なる場合
                </div>
                <div className="item-info has-line-border">
                  開店時間：08:00〜19:30（月火水金）08:00〜12:30（土）
                  <hr />
                  特定販売時間：09:00〜19:00（月火水金）09:00〜12:00（土）
                </div>

                <div className="item-info title">
                  営業時間外で医薬品の注文を受理する時間
                </div>
                <div className="item-info ">インターネット注文（24時間）</div>
                <div className="item-info title border-none">
                  特定販売を行う医薬品の使用期限
                </div>
                <div className="item-info border-none">
                  当店では使用期限が6ヶ月以上ある医薬品のみを配送いたします。
                </div>
              </div>
            </div>
          </div>
          <div className="guide-wrapper">
            <a
              href="http://member.wabisabi.media/wp-content/uploads/2022/02/要指導医薬品及び一般用医薬品の販売に関する制度に関する事項-.pdf"
              target="_blank"
            >
              要指導医薬品及び一般用医薬品の販売に関する制度に関する事項{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmaciesPage;
