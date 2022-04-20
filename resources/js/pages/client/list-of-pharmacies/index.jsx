import React from "react";
import "./list-of-pharmacies.scss";
import PageHead from "../../../commons/PageHead";
import { useTranslation } from "react-i18next";
const PharmaciesPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHead content="List Of Pharmacies" title="List Of Pharmacies" />
      <div id="list-of-pharmacies">
        <div className="list_pharmacies">
          <div className="card card-list-pharmacies">
            <div className="table-responsive">
              <div className="name-vendor first">
                {t("list_pharmacies.title")}
              </div>
              <div className="vendor-wrap">
                <div className="pc d-flex justify-content-between flex-wrap">
                  <div className="item-info title">
                    {t("list_pharmacies.outside_image")}
                  </div>
                  <div className="item-info title">
                    {t("list_pharmacies.inside_image")}
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
                {/* <div className="sp d-flex justify-content-between flex-wrap">
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
                <div className="d-none item-info "></div> */}
              </div>
              <div className="name-vendor second">
                {t("list_pharmacies.title_concerning_management")}
              </div>
              <div className="vendor-wrap">
                <div className="item-info title">
                  {t("list_pharmacies.title_classification")}
                </div>
                <div className="item-info item-info ">
                  {t("list_pharmacies.value_classification")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_founder")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_founder")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_permit")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_permit1")}
                  <br />
                  {t("list_pharmacies.value_permit2")}
                  <br />
                  {t("list_pharmacies.value_permit3")}
                  <br />
                  {t("list_pharmacies.value_permit4")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_management_pharmacist")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_management_pharmacist")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_working_pharmacies")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_working_pharmacies")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_register_seller")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_register_seller")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_over_the_counter_drugs_handle")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_over_the_counter_drugs_handle")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_distinguishing")}
                </div>
                <div className="item-info has-line-border">
                  {t("list_pharmacies.value_distinguishing1")}
                  <hr />
                  {t("list_pharmacies.value_distinguishing2")}
                </div>

                <div className="item-info title">
                  {t("list_pharmacies.title_business_hours")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_business_hours1")}
                  <br />
                  {t("list_pharmacies.value_business_hours2")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_consultation_outside")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_consultation_outside")}
                </div>

                <div className="item-info title">
                  {t("list_pharmacies.title_contact")}
                </div>
                <div className="item-info">
                  {t("list_pharmacies.value_contact1")}
                  <br />
                  {t("list_pharmacies.value_contact2")}
                  <br />
                  {t("list_pharmacies.value_contact3")}
                  <br />
                  {t("list_pharmacies.value_contact4")}
                </div>

                <div className="item-info title">
                  {t("list_pharmacies.title_current_working_pharmacies")}
                </div>
                <div className="item-info has-line-border">
                  {t("list_pharmacies.value_current_working_pharmacies1")}
                  <hr />
                  {t("list_pharmacies.value_current_working_pharmacies2")}
                  <hr />
                  {t("list_pharmacies.value_current_working_pharmacies3")}
                </div>
                <div className="item-info title">
                  {t("list_pharmacies.title_specific_sale_time")}
                </div>
                <div className="item-info has-line-border">
                  {t("list_pharmacies.value_specific_sale_time1")}
                  <hr />
                  {t("list_pharmacies.value_specific_sale_time2")}
                </div>

                <div className="item-info title">
                  {t("list_pharmacies.title_time_accept_order")}
                </div>
                <div className="item-info ">
                  {t("list_pharmacies.value_time_accept_order")}
                </div>
                <div className="item-info title border-none">
                  {t("list_pharmacies.title_expiration_date")}
                </div>
                <div className="item-info border-none">
                  {t("list_pharmacies.value_expiration_date")}
                </div>
              </div>
            </div>
          </div>
          <div className="guide-wrapper">
            <a
              href="http://member.wabisabi.media/wp-content/uploads/2022/02/要指導医薬品及び一般用医薬品の販売に関する制度に関する事項-.pdf"
              target="_blank"
            >
              {t("list_pharmacies.title_problem")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmaciesPage;
