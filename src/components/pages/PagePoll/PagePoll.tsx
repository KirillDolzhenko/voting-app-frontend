import PageTemplate from '../templates/PageTemplate/PageTemplate';
import PollCreation from '@/components/blocks/PollCreation/PollCreation';

const PagePoll = () => {
  return (
    <PageTemplate title="Votify" heading="Создай опрос">
      <PollCreation />
    </PageTemplate>
  );
};

export default PagePoll;
