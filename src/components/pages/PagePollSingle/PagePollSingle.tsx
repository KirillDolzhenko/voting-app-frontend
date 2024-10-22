import Polls from '@/components/blocks/Polls/Polls';
import PageTemplate from '../templates/PageTemplate/PageTemplate';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const PagePollSingle = () => {
  // const dispatch = useAppDispatch();
  const poll = useSelector((state: RootState) => state.pollSlice.poll);

  return (
    <PageTemplate title="Votify" heading={poll ? poll.title : 'Конкретный опрос'}>
      <>
        {poll?.options.map((el) => (
          <>
            <span>{el.text}</span>
            <br />
          </>
        ))}
      </>
    </PageTemplate>
  );
};

export default PagePollSingle;
