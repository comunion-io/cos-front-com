import { APP_NAME } from '@/configs/app';
import { setDocumentTitle } from '@/utils/dom';

export default {
  after: to => {
    if (to.meta.title) {
      setDocumentTitle(`${APP_NAME} - ${to.meta.title}`);
    } else {
      setDocumentTitle(APP_NAME);
    }
  }
};
