import React from "react";
import "./list-of-pharmacies.scss";
import PageHead from "../../../commons/PageHead";
import { useTranslation } from "react-i18next";
import CardPharmacy from "../../../commons/CardPharmacy";
import { useParams } from "react-router-dom";
import usePharmacy from "../../../hooks/pharmacy/usePharmacy";
import { Image, Typography } from "antd";
import { getCurrentLanguage } from "../../../helper/localStorage";
import usePharmacies from "../../../hooks/pharmacy/usePharmacies";
import CardProduct from "../../../commons/CardProduct";
const PharmacyDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getPharmacy, pharmacy } = usePharmacy();
  const {getDetailProductPharmacy,productPharmacy} = usePharmacies();
  const lang = getCurrentLanguage();
  const { Paragraph } = Typography;

  React.useEffect(() => {
    if (id) {
      getPharmacy(id);
    }
  }, [id, lang]);

  React.useEffect(() => {
    if (id) {
      getDetailProductPharmacy(id);
    }
  }, [id]);
  console.log(productPharmacy);
  return (
    <>
      <PageHead
        title={t("meta.title_pharmacy_details")}
        content={t("meta.content_pharmacy_details")}
      />
      {pharmacy && 
        <div id="list-of-pharmacies">
          <div className="list_pharmacies">
            <div className="card card-list-pharmacies">
              <div className="table-responsive">
                <div className="name-vendor first">
                  <Paragraph ellipsis className="text-white mb-1">
                    {pharmacy.name}
                  </Paragraph>
                </div>
                <div className="vendor-wrap">
                  <div className="pc d-flex justify-content-between flex-wrap">
                    <div className="item-info title">
                      {t("client.list_pharmacies.outside_image")}
                    </div>
                    <div className="item-info title">
                      {t("client.list_pharmacies.inside_image")}
                    </div>
                    <div className="item-info border-none d-flex  flex-wrap justify-content-center">
                      {pharmacy.images_outside.map((item, index) => (
                        <div key={index} className="item-image p-1">
                          <Image alt="image-vendor" src={item.url} />
                        </div>
                      ))}
                    </div>
                    <div className="item-info border-none d-flex  flex-wrap justify-content-center">
                      {pharmacy.images_inside.map((item, index) => (
                        <div key={index} className="item-image p-1">
                          <Image alt="image-vendor" src={item.url} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="name-vendor second">
                  {t("client.list_pharmacies.title_concerning_management")}
                </div>
                <div className="vendor-wrap">
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_classification")}
                  </div>
                  <div className="item-info item-info ">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.permit_classification,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_founder")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.founder,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_permit")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.items_stated_permit,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_management_pharmacist")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.management_pharmacist,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_working_pharmacies")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.pharmacist_working,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_register_seller")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.registered_seller_working,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t(
                      "client.list_pharmacies.title_over_the_counter_drugs_handle"
                    )}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.drugs_handled,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_distinguishing")}
                  </div>
                  <div className="item-info has-line-border">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.distinguishing_by_name,
                      }}
                    />
                  </div>

                  <div className="item-info title">
                    {t("client.list_pharmacies.title_business_hours")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.business_hours,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_consultation_outside")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.time_order_outside,
                      }}
                    />
                  </div>

                  <div className="item-info title">
                    {t("client.list_pharmacies.title_contact")}
                  </div>
                  <div className="item-info">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.contact_information,
                      }}
                    />
                  </div>

                  <div className="item-info title">
                    {t(
                      "client.list_pharmacies.title_current_working_pharmacies"
                    )}
                  </div>
                  <div className="item-info has-line-border">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.currently_working,
                      }}
                    />
                  </div>
                  <div className="item-info title">
                    {t("client.list_pharmacies.title_specific_sale_time")}
                  </div>
                  <div className="item-info has-line-border">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.open_sale_time,
                      }}
                    />
                  </div>

                  <div className="item-info title">
                    {t("client.list_pharmacies.title_time_accept_order")}
                  </div>
                  <div className="item-info ">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.time_order_outside,
                      }}
                    />
                  </div>
                  <div className="item-info title border-none">
                    {t("client.list_pharmacies.title_expiration_date")}
                  </div>
                  <div className="item-info border-none">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: pharmacy.expiration_date_of_drugs,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="pharmacy-list">
                  <div className="list_pharmacies">
                    <div className="type-wrapper">
                      <div className="type-name">{t("client.list_pharmacies.title_list_product")}</div>
                    </div>
                    <CardProduct cardItems={productPharmacy} />
                  </div>
                </div>
            <div className="guide-wrapper">
              <a
                href="http://member.wabisabi.media/wp-content/uploads/2022/02/???????????????????????????????????????????????????????????????????????????????????????-.pdf"
                target="_blank"
              >
                {t("client.list_pharmacies.title_problem")}
              </a>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PharmacyDetail;
