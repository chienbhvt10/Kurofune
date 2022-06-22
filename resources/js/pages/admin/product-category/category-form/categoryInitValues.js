export const getCategoryInitValues = (item) => {
  return {
    id: item?.id || "",
    user_id: item?.user_id || "",
    slug: item?.slug || "",
    category_image: item?.category_image || "",
    type: item?.type || undefined,
    parent_id: item?.parent_id || undefined,
  };
};

export const getTranslateCategoryInitValues = (translateValues, lang) => {
  return {
    [`${lang}_name`]: translateValues?.name || "",
  };
};

export const getCategoryFormLayout = () => {
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
