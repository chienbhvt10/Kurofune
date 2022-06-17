export const getTaxInitValues = (item) => {
  return {
    name: item?.name,
    value: item?.value || undefined,
  };
};

export const getTaxFormLayout = () => {
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
