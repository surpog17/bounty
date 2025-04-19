// MessageService.ts
import { message } from 'antd';

export const MessageService = {
  success: (content: string, duration = 3) => {
    message.success({
      content,
      duration,
    });
  },

  error: (content: string, duration = 3) => {
    message.error({
      content,
      duration,
    });
  },

  info: (content: string, duration = 3) => {
    message.info({
      content,
      duration,
    });
  },

  warning: (content: string, duration = 3) => {
    message.warning({
      content,
      duration,
    });
  },
};
