import { api } from "@src/utils/api";
import { useRouter } from "next/router";
import * as React from "react";

import Button from "../ui/Button";
import Option from "./Option";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IGameProps {
  gameId: string;
  page: string;
}

const Game: React.FC<IGameProps> = props => {
  const {
    data,
    isLoading,
    mutateAsync: getQuestions,
  } = api.player.get_questions.useMutation();
  const {
    mutateAsync,
    isLoading: isAnswering,
    isSuccess,
    data: answer,
  } = api.player.answer_question.useMutation();
  const {
    mutateAsync: getAnwsered,
    isLoading: isAnswered,
    isSuccess: isAnwseredSuccess,
    data: answered,
  } = api.player.get_anwsered.useMutation();

  const [count, setCount] = React.useState(-1);
  const [anwseres, setAnwsered] = React.useState(false);
  const { push } = useRouter();
  React.useEffect(() => {
    void getQuestions({
      game_id: props.gameId,
      page: parseInt(props.page),
    });
  }, [props]);
  React.useEffect(() => {
    if (isLoading) return;
    if (data?.current_question?.id && props.gameId) {
      void getAnwsered({
        game_id: props.gameId,
        question_id: data?.current_question?.id,
      }).then(res => {
        console.log(res);
        if (res.success && parseInt(props.page) < data?.questions.length) {
          setTimeout(() => {
            void push(
              `/dashboard/game?gameId=${props.gameId}&page=${parseInt(props.page) + 1}`,
            );
          }, 3000);
        }
      });
    }
    const timerId = setInterval(() => {
      const duration = (data?.current_question?.duration ?? 0) / 1000;
      if (duration > 0) {
        setCount(prevCount =>
          prevCount === -1 ? duration : prevCount > 0 ? prevCount - 1 : 0,
        );
      }
    }, 1000);

    return () => clearInterval(timerId); // cleanup on unmount
  }, [data?.current_question, isLoading]);
  const handleAnswer = (option_id: string) => {
    if (!data) return;
    void mutateAsync({
      game_id: props.gameId,
      question_id: data?.current_question?.id ?? "",
      option_id,
    }).then(res => {
      if (res.success && parseInt(props.page) < data?.questions.length) {
        setAnwsered(res.success);
        setTimeout(() => {
          void push(
            `/dashboard/game?gameId=${props.gameId}&page=${parseInt(props.page) + 1}`,
          ).then(() => setAnwsered(false));
        }, 3000);
      }
    });
  };
  return isLoading ? (
    <section className="grid items-center text-center">
      <span>Loading.....</span>
    </section>
  ) : (
    <section className="relative py-4">
      {(answered?.success ?? anwseres) && (
        <div
          data-wrong={
            answer?.details?.points === 0 || answered?.details?.points === 0
          }
          data-correct={
            (answer?.details?.points ?? 0) > 0 ||
            (answered?.details?.points ?? 0) > 0
          }
          className="data-wrong: fixed inset-0 grid place-content-center bg-black/60 text-7xl font-bold text-red-700 data-correct:text-secondary-700"
        >
          {answered?.success
            ? answered?.details?.points === 0
              ? `-${answered?.details?.points ?? 0}`
              : `+${answered?.details?.points ?? 0}`
            : answer?.details?.points === 0
              ? `-${answer?.details?.points ?? 0}`
              : `+${answer?.details?.points ?? 0}`}
          <Button
            text="Finish"
            className="mx-auto mt-4 px-6 py-2 text-lg text-white"
          />
        </div>
      )}
      <div className="h-full w-full border-y-2 border-secondary-700 px-12 py-4 text-lg">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="w-36 rounded-full border-2 border-secondary-100 bg-secondary-700 px-3 py-1 text-right">
              {props.page}/{data?.questions.length}
            </h1>
            <span>Score: {data?.score ?? 0}</span>
          </div>
          {/* <span className="flex h-12 w-28 items-center justify-center rounded-full  border border-secondary-100 text-secondary-700">
            {count === -1 ? 0 : count}secs
          </span> */}
        </div>
      </div>
      <div className="mx-auto w-9/12 px-10 py-16">
        <h2 className="text-center text-3xl font-medium">
          {data?.current_question?.question}
        </h2>
        <div className="mx-auto mt-6 flex w-10/12 flex-col space-y-6">
          {data?.current_question?.options.map(option => (
            <Option
              data-wrong={
                answer?.option_id === option.id && answer.details.points === 0
              }
              data-correct={
                answer?.option_id === option.id && answer.details.points > 0
              }
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              option={option}
              disabled={isAnswering || anwseres || answered?.success}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Game;
