export const getProductInfoInitValues = (item) => {
  return {
    slug: item?.slug || "",
    sku: item?.sku || "",
    stock_status: item?.stock_status || undefined,
    price: item?.price || 0,
    status: item?.status || undefined,
    product_image: item?.product_image || "",
    tax_id: item?.tax_id || undefined,
    meta_title: item?.meta_title || "",
    meta_description: item?.meta_description || "",
    meta_keywords: item?.meta_keywords || "",
    user_id: item?.user_id || undefined,
    cat_id: item?.cat_arr || undefined,
  };
};

export const getTranslateInitValues = () => {
  return {
    name: "",
    classification: "",
    features: "",
    precautions: "",
    efficacy_effect: "",
    usage_dose: "",
    activeIngredients: "",
    additives: "",
    precautionsStorageHandling: "",
    manufacturer: "",
  };
};

export const getProductFormLayout = () => {
  return {
    labelCol: {
      lg: { span: 24 },
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      lg: { span: 24 },
      xs: { span: 24 },
      sm: { span: 24 },
    },
    labelAlign: "left",
  };
};
