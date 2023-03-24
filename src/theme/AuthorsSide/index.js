import React from "react";
import clsx from "clsx";
import { useDoc } from "@docusaurus/theme-common/internal";
import Link from "@docusaurus/Link";
// Component responsible for the authors layout
import globalAuthors from "@site/authors.json";
import dev from "@site/static/img/avatars/dev.png"; //Ensure we have the fallback image

function MaybeLink(props) {
  if (props.href) {
    return <Link {...props} />;
  }
  return <>{props.children}</>;
}

export default function AuthorsSide({ className }) {
  const { metadata } = useDoc();
  const authors = metadata.frontMatter.authors ?? [];
  const authorsCount = authors.length;

  const handleOnError = (e) => {
    e.target.src = dev; // Fallback img in case of 404.
  };

  if (authorsCount === 0) {
    return null;
  }
  const allAuthors = [];
  authors.forEach((author) => {
    if (globalAuthors[author]) {
      const docAuthor = {
        url: globalAuthors[author].url ?? "https://github.com/" + author,
        image_path:
          globalAuthors[author].image_path ??
          "https://github.com/" + author + ".png",
        name: globalAuthors[author].name ?? author,
        title: globalAuthors[author].title ?? null,
      };
      allAuthors.push(docAuthor);
    } else {
      const new_author = {
        url: "https://github.com/" + author,
        image_path: "https://github.com/" + author + ".png",
        name: author,
      };
      allAuthors.push(new_author);
    }
  });
  if (allAuthors.length === 0) {
    return null;
  }
  const multipleAuthors = allAuthors.length > 1;

  return (
    <div className="padding--sm padding-left--md">
      <div className="row">
        {multipleAuthors && <h4>Authors </h4>}
        {!multipleAuthors && <h4>Author </h4>}
      </div>
      <div className="row">
        {allAuthors.map((author, idx) => (
          <div className={clsx("col", className)} key={idx}>
            <div className="authors-avatar__container">
              <div className={clsx("avatar margin-bottom--sm", className)}>
                <MaybeLink href={author.url} className="avatar__photo-link">
                  <img
                    className="avatar__photo"
                    src={author.image_path}
                    alt={author.name}
                    onError={handleOnError}
                  />
                </MaybeLink>
                <div
                  className="avatar__intro"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <div className="avatar__name">
                    <MaybeLink href={author.url} itemProp="url">
                      <span itemProp="name">{author.name}</span>
                    </MaybeLink>
                  </div>
                  {author.title && (
                    <small className="avatar__subtitle" itemProp="description">
                      {author.title}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}