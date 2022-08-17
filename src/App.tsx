import "./App.css";
import { useGetPokemonsInifiniteQuery } from "./apis";
import React, { UIEventHandler, useState } from "react";

const LIMIT = 2;

function App() {
  const [name, setName] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetPokemonsInifiniteQuery(
      {
        name,
        limit: LIMIT,
      },
      {
        getNextPageParam: (prevPage, pages) => {
          if (pages.length < prevPage.totalPage) {
            return {
              offset: pages.length * LIMIT,
            };
          }
          return undefined;
        },
      }
    );

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, offsetHeight, scrollHeight } = target;
    const bottom = Math.ceil(scrollTop + offsetHeight) === scrollHeight;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "200px",
          overflowY: "auto",
        }}
        onScroll={handleScroll}
      >
        {isFetching && !isFetchingNextPage ? (
          <span>Loading</span>
        ) : (
          data?.pages.map((group) =>
            group.pokemons.map((pokemon) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "150px",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid",
                }}
                key={pokemon.id}
              >
                {pokemon.id}. {pokemon.name}
              </div>
            ))
          )
        )}
      </div>
      {isFetchingNextPage && <span>Loading...</span>}
    </div>
  );
}

export default App;
