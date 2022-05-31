import React from "react";
import { useTranslation } from "react-i18next";
import "./product-detail.scss";
import useProductClient from "../../../hooks/product/useProductClient";
import { useLocation, useParams } from "react-router-dom";
const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation()
  const { getProductClient, productClient } = useProductClient();
  React.useEffect(() => {
    if (id) {
      getProductClient({ id: id });
    }
  }, [id,location]);
  return (
    <>
      {productClient && (
        <div id="info-prod" className="card">
          <div className="container-detail-product">
            <div className="wrap-detail-product">
              <div className="item-prod image-prod">
                <img
                  alt= {productClient.name}
                  src={productClient.product_image}
                />
              </div>
              <div className="item-prod summary-prod">
                <div className="summary-detail">
                  <div className="product-name">
                    {productClient.name}
                  </div>
                  <div className="medicinal_efficacy_block">
                    <div className="medicinal_efficacy_item medicinal_efficacy_label">
                     {productClient.medicinal_efficacy_classification}
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
                              {productClient.price} &nbsp;
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
                  <select
                    name="currently_treating"
                    id=""
                    className="input-answer"
                  >
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
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
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
                  <div className="item-info value-item"> <span  dangerouslySetInnerHTML={{
                    __html:productClient.features,
                  }}/> </div>
                  <div className="item-info label-item">Precautions </div>
                  <div className="item-info value-item" >
                 <span  dangerouslySetInnerHTML={{
                    __html: productClient.precautions,
                  }}/>
                  </div>
                  <div className="item-info label-item">Efficacy / effect </div>
                  <div className="item-info value-item">
                  <span  dangerouslySetInnerHTML={{
                    __html: productClient.efficacy_effect,
                  }}/>
                  </div>
                  <div className="item-info label-item">Usage / dose </div>
                  <div className="item-info value-item">
                  <span  dangerouslySetInnerHTML={{
                    __html: productClient.usage_dose,
                  }}/>
                  </div>
                  <div className="item-info label-item">
                    Active ingredients{" "}
                  </div>
                  <div className="item-info value-item">
                  <span  dangerouslySetInnerHTML={{
                    __html: productClient.active_ingredients,
                  }}/>
                  </div>
                  <div className="item-info label-item">Additives </div>
                  <div className="item-info value-item">
                  <span  dangerouslySetInnerHTML={{
                    __html: productClient.additives,
                  }}/>
                  </div>
                  <div className="item-info label-item">
                    Precautions for storage and handling{" "}
                  </div>
                  <div className="item-info value-item">  <span  dangerouslySetInnerHTML={{
                    __html: productClient.precautions_storage_handling,
                  }}/>
                  </div>
                  <div className="item-info label-item last-item">
                    Manufacturer{" "}
                  </div>
                  <div className="item-info value-item last-item">
                  <span  dangerouslySetInnerHTML={{
                    __html: productClient.manufacturer,
                  }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
