import { notification } from "antd";

export const NotificationInfo = (title, message) => {
  notification.info({
    message: title,
    description: message,
    placement: "bottomRight",
  });
};

export const NotificationSuccess = (title, message) => {
  notification.success({
    message: title,
    description: message,
    placement: "bottomRight",
  });
};

export const NotificationError = (title, message) => {
  notification.error({
    message: title,
    description: message,
    placement: "bottomRight",
  });
};
