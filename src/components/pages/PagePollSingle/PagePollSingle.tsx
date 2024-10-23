import PageTemplate from '../templates/PageTemplate/PageTemplate';
import PollOptions from '@/components/ui/PollOptions/PollOptions';

const PagePollSingle = () => {
  // const dispatch = useAppDispatch();
  return (
    <PageTemplate title="Votify" heading="Проголосуй в опросе!">
      <>
        <PollOptions />
      </>
    </PageTemplate>
  );
};

export default PagePollSingle;
