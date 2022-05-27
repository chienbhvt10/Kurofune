import React from "react";
import { useTranslation } from "react-i18next";
import "./product-detail.scss";
import useProductClient from "../../../hooks/product/useProductClient";
import { useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { getProductClient, productClient } = useProductClient();
  React.useEffect(() => {
    if (id) {
      getProductClient({ id: id });
    }
  }, [id]);
  return (
    <div id="info-prod" className="card">
      <div className="container-detail-product">
        <div className="wrap-detail-product">
          <div className="item-prod image-prod">
            <img
              alt="Loxonin S (12 tablets)"
              src="https://member.wabisabi.media/wp-content/uploads/2021/12/1_loxonin-s-1.jpg"
            />
          </div>
          <div className="item-prod summary-prod">
            <div className="summary-detail">
              <div className="product-name">Loxonin S (12 tablets)</div>
              <div className="medicinal_efficacy_block">
                <div className="medicinal_efficacy_item medicinal_efficacy_label">
                  Medicinal efficacy classification
                </div>
                <div className="medicinal_efficacy_item medicinal_efficacy_value">
                  Antipyretic Analgesic
                </div>
              </div>
              <div className="block-price flex">
                <div className="item-info price-info flex flex-column">
                  <div className="no-sale">
                    <div className="Ybrg9j">
                      <span className="woocommerce-Price-amount amount">
                        <bdi>
                          713&nbsp;
                          <span className="woocommerce-Price-currencySymbol">
                            (JPY)
                          </span>
                        </bdi>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="item-info product-type">
                  First-class OTC drugs
                </div>
                <div className="btn-cart-pc item-info block-btn-checkout customs_btn_cart">
                  <form
                    className="cart"
                    action="https://member.wabisabi.media/en/product/loxonin-s-12-tablets"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <div className="quantity">
                      <label
                        className="screen-reader-text"
                        htmlFor="quantity_6257eb17c8348"
                      >
                        Loxonin S (12 tablets) quantity
                      </label>
                      <input
                        type="number"
                        id="quantity_6257eb17c8348"
                        className="input-text qty text"
                        step="1"
                        min="1"
                        max=""
                        name="quantity"
                        value="1"
                        title="Qty"
                        size="4"
                        placeholder=""
                        inputMode="numeric"
                      />
                    </div>

                    <button
                      type="submit"
                      name="add-to-cart"
                      value="99"
                      className="single_add_to_cart_button button alt actived"
                    >
                      {t("client.product_detail.btn_buy")}
                    </button>
                  </form>
                </div>
              </div>
              <div className="d-none btn-cart-sp block-btn-checkout customs_btn_cart">
                <form
                  className="cart"
                  action="https://member.wabisabi.media/en/product/loxonin-s-12-tablets"
                  method="post"
                  encType="multipart/form-data"
                >
                  <div className="quantity">
                    <label
                      className="screen-reader-text"
                      htmlFor="quantity_6257eb17c8412"
                    >
                      Loxonin S (12 tablets) quantity
                    </label>
                    <input
                      type="number"
                      id="quantity_6257eb17c8412"
                      className="input-text qty text"
                      step="1"
                      min="1"
                      max=""
                      name="quantity"
                      value="1"
                      title="Qty"
                      size="4"
                      placeholder=""
                      inputMode="numeric"
                    />
                  </div>

                  <button
                    type="submit"
                    name="add-to-cart"
                    value="99"
                    className="single_add_to_cart_button button alt actived"
                  >
                    {t("client.product_detail.btn_buy")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <input type="hidden" id="medicine-type" value="1" />
        <div className="list-questions-wrap">
          <input type="hidden" id="user-id" value="1" />
          <input type="hidden" id="product-id" value="99" />
          <input type="hidden" id="current-lang" value="en" />
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_gender")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <select name="gender" className="input-answer" id="">
                <option value="">
                  {t("client.product_detail.placeholder_select")}
                </option>
                <option value="1">
                  {t("client.product_detail.option_gender1")}
                </option>
                <option value="2">
                  {t("client.product_detail.option_gender2")}
                </option>
              </select>
              <p className="message-warning warning-gender"></p>
            </div>
          </div>
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_age")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <select name="yearold" className="input-answer">
                <option value="">
                  {t("client.product_detail.placeholder_select")}
                </option>
                <option value="1">
                  {t("client.product_detail.option_age1")}
                </option>
                <option value="2">
                  {t("client.product_detail.option_age2")}
                </option>
                <option value="3">
                  {t("client.product_detail.option_age3")}
                </option>
              </select>
              <p className="message-warning warning-year_old"></p>
            </div>
          </div>
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_ever_used")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <select name="used_medicine" className="input-answer">
                <option value="">
                  {t("client.product_detail.placeholder_select")}
                </option>
                <option value="1">
                  {t("client.product_detail.option_yes")}
                </option>
                <option value="2">
                  {t("client.product_detail.option_no")}
                </option>
              </select>
              <p className="message-warning warning-used_medicine"></p>
            </div>
          </div>
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_ever_side_effect")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <select name="taken_any_medicine" className="input-answer">
                <option value="">
                  {t("client.product_detail.placeholder_select")}
                </option>
                <option value="1">
                  {t("client.product_detail.option_yes")}
                </option>
                <option value="2">
                  {t("client.product_detail.option_no")}
                </option>
              </select>
              <p className="message-warning warning-taken_any_medicine"></p>
            </div>
          </div>
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_using_medicine")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <textarea
                placeholder={t("client.product_detail.placeholder_text")}
                name="list_used_medicine"
                className="input-answer"
                rows="1"
              ></textarea>
              <p className="message-warning warning-list_used_medicine"></p>
            </div>
          </div>
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_other_illnesses")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <select name="currently_treating" id="" className="input-answer">
                <option value="">
                  {t("client.product_detail.placeholder_select")}
                </option>
                <option value="12">
                  {t("client.product_detail.option_other_illnesses1")}
                </option>
                <option value="1">
                  {t("client.product_detail.option_other_illnesses2")}
                </option>
                <option value="2">
                  {t("client.product_detail.option_other_illnesses3")}
                </option>
                <option value="3">
                  {t("client.product_detail.option_other_illnesses4")}
                </option>
                <option value="4">
                  {t("client.product_detail.option_other_illnesses5")}
                </option>
                <option value="5">
                  {t("client.product_detail.option_other_illnesses6")}
                </option>
                <option value="6">
                  {t("client.product_detail.option_other_illnesses7")}
                </option>
                <option value="7">
                  {t("client.product_detail.option_other_illnesses8")}
                </option>
                <option value="8">
                  {t("client.product_detail.option_other_illnesses9")}
                </option>
                <option value="9">
                  {t("client.product_detail.option_other_illnesses10")}
                </option>
                <option value="10">
                  {t("client.product_detail.option_other_illnesses11")}
                </option>
                <option value="11">
                  {t("client.product_detail.option_other_illnesses12")}
                </option>
              </select>
              <p className="message-warning warning-currently_treating"></p>

              <div className="another-treating-wrap mt-2 d-none">
                <textarea
                  placeholder={t("client.product_detail.placeholder_text")}
                  name="another-treating"
                  className="input-answer"
                />
                <p className="message-warning warning-another-treating"></p>
              </div>
            </div>
          </div>
          <div className="question-answer-wrap">
            <div className="question">
              {t("client.product_detail.label_other_question")}
              <span className="required">(required)</span>
            </div>
            <div className="answer">
              <textarea
                placeholder={t("client.product_detail.placeholder_text")}
                name="any-questions"
                className="input-answer"
              />
              <p className="message-warning warning-any_questions"></p>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="noticeModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="noticeModalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p className="font-weight-bold">
                  Could not add to shopping cart
                </p>
                <p>Please check your input.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-more-info-product">
          <div className="more-info-block flex flex-column">
            <div className="more-info-wrap">
              <div className="item-info label-item">Features </div>
              <div className="item-info value-item">
                It contains antipyretic and analgesic components that have fast
                effect on pain. It is a prodrug formulation with little strain
                on the stomach. Does not contain ingredients that make you
                sleepy. One tablet at a time works well. A small tablet that is
                easy to swallow.{" "}
              </div>
              <div className="item-info label-item">Precautions </div>
              <div className="item-info value-item">
                1. People who belong to one of these groups should not take the
                drug: <br />
                (1) People who have had allergic symptoms after taking this drug
                or the components of it.
                <br />
                (2) People who have had asthma after taking this drug or other
                antipyretic analgesics, cold remedies.
                <br />
                (3) Children under 15 years of age.
                <br />
                (4) People receiving the following treatment at a medical
                institution: Gastric / duodenal ulcer, liver disease, kidney
                disease, heart disease.
                <br />
                (5) People who have been diagnosed by doctors as having blood
                abnormalities (blood diseases) such as low red blood cell count
                (anemia), low platelet count (difficult to stop bleeding,
                excessively bleeding), and low white blood cell count.
                <br />
                (6) Pregnant women within 12 weeks of the expected delivery
                date.
                <br />
                2. Do not take any of the following medicines while taking this
                drug. <br />
                Other antipyretic analgesics, cold remedies and sedatives
                <br />
                3. Please do not drink alcohol before and after taking this
                drug.
                <br />
                4. Please do not take this drug for a long time.{" "}
              </div>
              <div className="item-info label-item">Efficacy / effect </div>
              <div className="item-info value-item">
                Headache, menstrual pain (physiological pain), toothache,
                post-tooth extraction pain, sore throat, lower back pain, joint
                pain, nerve pain, muscle pain, frozen shoulder pain, ear pain,
                bruise pain, fracture pain, sprain, trauma, chills &amp; fever.{" "}
              </div>
              <div className="item-info label-item">Usage / dose </div>
              <div className="item-info value-item">
                Age: 1 dose: Number of doses per day
                <br />
                Adults (15 years old and over): 1 tablet: up to 2 times
                <br />
                However, if symptoms reappear, you can take the third dose.
                <br />
                (Please leave at least 4 hours between doses)
                <br />
                Under 15 years old: Do not take this.{" "}
              </div>
              <div className="item-info label-item">Active ingredients </div>
              <div className="item-info value-item">
                Loxoprofen sodium hydrate 68.1 mg (60 mg as anhydrate){" "}
              </div>
              <div className="item-info label-item">Additives </div>
              <div className="item-info value-item">
                Hydroxypropyl cellulose, magnesium stearate, lactose hydrate,
                iron sesquioxide.{" "}
              </div>
              <div className="item-info label-item">
                Precautions for storage and handling{" "}
              </div>
              <div className="item-info value-item">
                (1) Store in a cool, dry place and keep it not to be exposed to
                direct sunlight.
                <br />
                (2) Please keep out of reach of children.
                <br />
                (3) Do not put it in a different container. (It may cause misuse
                or change of the quality)
                <br />
                (4) Do not use after the expiration date has passed.{" "}
              </div>
              <div className="item-info label-item last-item">
                Manufacturer{" "}
              </div>
              <div className="item-info value-item last-item">
                Daiichi Sankyo Healthcare Co., Ltd.{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
