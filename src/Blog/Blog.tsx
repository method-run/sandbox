import { Route, Routes } from "react-router-dom";
import {
  ComponentProps,
  ReactNode,
  Suspense,
  useEffect,
  useState,
} from "react";
import { PostsNav } from "./PostsNav";
import { getPostRoutesAsync } from "./getPostRoutesAsync";

export const Blog = (): ReactNode => {
  const [postRouteProps, setPostRouteProps] = useState<
    Array<ComponentProps<typeof Route> & { slug: string }>
  >([]);

  useEffect(() => {
    const getPostRouteProps = async () => {
      const postRouteProps = await getPostRoutesAsync();
      setPostRouteProps(postRouteProps);
    };

    getPostRouteProps();
  }, []);

  return (
    <>
      <h1>Blog</h1>
      <Suspense fallback={<div>Loading ...</div>}>
        <PostsNav />
      </Suspense>
      <Routes>
        <Route
          index
          element={
            <div>
              <p>
                Oh, man. I don't know what to tell you. These are gonna be some
                random thoughts.
              </p>
              <p>
                I believe deeply in transparency and vulnerability. I like
                saying "Fuck it, ship it." But what comes out is ... you know, a
                mess.
              </p>
              <p>Enjoy this sporadically published blog.</p>
            </div>
          }
        />
        {postRouteProps.map((props) => (
          <Route {...props} key={props.slug} />
        ))}
      </Routes>
    </>
  );
};
