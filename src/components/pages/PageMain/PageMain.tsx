import Polls from '@/components/blocks/Polls/Polls';
import PageTemplate from '../templates/PageTemplate/PageTemplate';

const PageMain = () => {
  return (
    <PageTemplate title="Votify" heading="Все опросы">
      <Polls />
    </PageTemplate>
  );
};

export default PageMain;
