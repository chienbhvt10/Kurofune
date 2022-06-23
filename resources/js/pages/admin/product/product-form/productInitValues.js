export const getProductInfoInitValues = (item) => {
  return {
    id: item?.id || "",
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

export const getTranslateInitValues = (translateValues, lang) => {
  return {
    [`${lang}_name`]: translateValues?.name || "",
    [`${lang}_medicinal_efficacy_classification`]:
      translateValues?.medicinal_efficacy_classification || "",
    [`${lang}_features`]: translateValues?.features || "",
    [`${lang}_precautions`]: translateValues?.precautions || "",
    [`${lang}_efficacy_effect`]: translateValues?.efficacy_effect || "",
    [`${lang}_usage_dose`]: translateValues?.usage_dose || "",
    [`${lang}_active_ingredients`]: translateValues?.activeIngredients || "",
    [`${lang}_additives`]: translateValues?.additives || "",
    [`${lang}_precautions_storage_handling`]:
      translateValues?.precautions_storage_handling || "",
    [`${lang}_manufacturer`]: translateValues?.manufacturer || "",
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
