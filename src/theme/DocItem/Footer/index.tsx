import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useDoc,
  type DocContextValue,
} from "@docusaurus/theme-common/internal";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline, {
  type Props as TagsListInlineProps,
} from "@theme/TagsListInline";

import styles from "./styles.module.css";
import FloatingIsland from "../../../components/FloatingIsland";
import ApplauseButton from "../../../components/Applause";
import { ReportAnIssue } from "../../../components/Issue";
import AuthorsSide from "@theme/AuthorsSide";
import TOCCollapsibleWrapper from "@theme/TOCCollapsible"

function TagsRow(props: TagsListInlineProps) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "row margin-bottom--sm"
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

type EditMetaRowProps = Pick<
  DocContextValue["metadata"],
  | "editUrl"
  | "lastUpdatedAt"
  | "lastUpdatedBy"
  | "formattedLastUpdatedAt"
  | "hide_applause"
  | "hide_issue"
>;
function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
  hide_applause,
  hide_issue,
}: EditMetaRowProps) {
  return (
    <>
      <hr></hr>
      <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, "row")}>
        <div className={clsx("col", styles.docFooterEditMetaRowItem)}>
          {!hide_applause && <ApplauseButton />}
        </div>
        <div className={styles.docFooterEditMetaRowItemRight}>
          {editUrl && <EditThisPage editUrl={editUrl} />}
          {!hide_issue && <ReportAnIssue />}
        </div>
      </div>
    </>
  );
}

export default function DocItemFooter(): JSX.Element | null {
  const { metadata, toc } = useDoc();
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
    frontMatter,
  } = metadata;
  const { hide_applause, hide_issue, authors } = frontMatter;

  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(
    editUrl ||
    lastUpdatedAt ||
    lastUpdatedBy ||
    !hide_applause ||
    !hide_issue
  );

  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;
  const canDisplayAuthorsSide = toc?.length < 1 && authors?.length > 0

  if (!canDisplayFooter) {
    return null;
  }

  console.log(toc);
  console.log(authors);

  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
    >
      {canDisplayAuthorsSide && <AuthorsSide className="col--6"/>}
      <div className="row">
        <p>
          <b>Want to contribute to pan.dev?</b> Check out our <a href="/contributing">contributing guide.</a>
        </p>
      </div>
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && <FloatingIsland />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
          hide_applause={hide_applause}
          hide_issue={hide_issue}
        />
      )}
    </footer>
  );
}
