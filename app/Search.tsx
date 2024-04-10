"use client";

import algoliasearch from "algoliasearch/lite";
import React from "react";
import {
  Highlight,
  SearchBox,
  RefinementList,
  DynamicWidgets,
  useInfiniteHits,
  Configure,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

import { Panel } from "../components/Panel";

const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");

export default function Search() {
  return (
    <InstantSearchNext searchClient={client} indexName="instant_search" routing>
      <Configure hitsPerPage={6} />
      <div className="Container">
        <div>
          <DynamicWidgets fallbackComponent={FallbackComponent} />
        </div>
        <div>
          <SearchBox />
          <Hits />
        </div>
      </div>
    </InstantSearchNext>
  );
}

export const Hits = () => {
  {
    /** Providing any cache object to the hook breaks it
       I am currently considering just writing my own custom solution that alters "hits" before rendering
       like this:
       cachedHits = useCachedHits(hits);
       cachedHits.map... 
       
       but would much rather use the built-in implementation if it was working  */
  }
  const { hits, showMore, isLastPage } = useInfiniteHits({
    cache: {
      read: () => {
        return null;
      },
      write: () => {},
    },
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {hits.map((hit, i) => (
          <Hit key={`${JSON.stringify(hit)}-${i}`} hit={hit} />
        ))}
      </div>
      <div
        className="w-full flex justify-center p-9"
        style={{
          padding: "4px 10px",
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <button
          onClick={showMore}
          className={`${
            isLastPage ? "hidden" : ""
          } bg-green-200 px-4 py-1 rounded-lg`}
        >
          Show more results
        </button>
      </div>
    </>
  );
};

function Hit({ hit }: any) {
  return (
    <div style={{ paddingTop: 12 }}>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </div>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}
