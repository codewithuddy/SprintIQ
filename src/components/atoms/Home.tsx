import { type Game } from "@prisma/client";
import { api } from "@src/utils/api";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { type ReactNode, useEffect, useMemo, useState } from "react";

import Badge from "../icons/Badge.icon";
import Bell from "../icons/Bell.icon";
import GameBoard from "../icons/GameBoard.icon";
import GamePad from "../icons/GamePad.icon";
import CreatedGame from "../molecule/CreatedGame";
import ActionButton from "../ui/ActionButton";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const [noMoreFetch, setNoMoreFetch] = useState(false);
  const [firstFetch, setFirstFetch] = useState(true);
  const [games, setGames] = useState<Array<Game>>([]);
  const { mutateAsync, isLoading } = api.game.get_created_games.useMutation();
  const { push } = useRouter();
  const elements = useMemo(
    () => [
      {
        click: () => {},
        text: "New Game",
        Icon: GameBoard,
      },
      {
        click: () => {
          void push("/dashboard/join");
        },
        text: "Join a Game",
        Icon: GamePad,
      },
      {
        click: () => {},
        text: "Test your knowledge",
        Icon: Badge,
      },
    ],
    [],
  );
  const fetchGames = async (reset?: boolean) => {
    const PAGE_SIZE = 5;
    const newGames = (
      await mutateAsync({
        limit: PAGE_SIZE,
        skip: games.length,
      })
    )?.games;
    if (newGames.length < PAGE_SIZE) {
      setNoMoreFetch(true);
    }
    setGames(prev => (reset ? [] : [...prev]).concat(newGames));
    setFirstFetch(false);
  };
  const resetState = async () => {
    setFirstFetch(true);
    setNoMoreFetch(false);
    void fetchGames(true);
  };

  useEffect(() => {
    void resetState();
  }, []);
  let content: ReactNode;
  if (firstFetch) {
    content = (
      <div className="my-8 flex flex-col items-center">
        <Spinner />
        <h2>Checking for your games...</h2>
      </div>
    );
  } else if (games.length === 0) {
    content = (
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-medium">Nothing in Drafts</h2>
        <p className="text-grey-200">
          Created games and ongoing games will be listed here
        </p>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col space-y-3">
        {games.map(data => (
          <CreatedGame key={data.id} {...data} />
        ))}

        {!noMoreFetch && !firstFetch && (
          <Button onClick={() => fetchGames()} text="Load more" />
        )}
      </div>
    );
  }
  return (
    <main>
      <header className="flex w-full items-center justify-between bg-black/[0.12] px-16 py-12">
        <Image
          className="relative h-10 w-auto"
          loading="lazy"
          alt=""
          width={222}
          height={46}
          src="/logo.png"
        />
        <div className="flex items-center justify-start gap-8">
          <Link
            className="rounded-full bg-secondary-700 px-5 py-2"
            href="/dashboard/create"
          >
            Create Game
          </Link>
          <Bell className="h-auto w-8" />
        </div>
      </header>
      <section className="mt-8 px-6 pb-6">
        <div className="rounded-b-xl border border-grey-100">
          <div className="border-b border-b-grey-100 py-8">
            <div className="mx-auto flex w-fit space-x-4 rounded-3xl border border-secondary-700 bg-secondary-300/10 px-6 py-3">
              {elements.map(data => (
                <ActionButton
                  key={data.text}
                  Icon={data.Icon}
                  text={data.text}
                  onClick={data.click}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-6 p-10">
            <h1 className="text-xl">Drafts</h1>
            {content}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
